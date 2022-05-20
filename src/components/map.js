import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import turf from 'turf';
import Precautions from './precautions';
import styles from '../css/filters.module.css';
import { 
    Autocomplete,
    Slider,
    TextField,
    Box,
    Grid
} from '@mui/material';
import {
    PeopleAltOutlined,
    RoomOutlined
} from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { styled } from '@mui/material/styles';
  
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // pulls Mapbox token from env file
const regions = require('../assets/regions.json');
const marks = require('../assets/eventSizes.json');

const FilterBox = styled(Box)(
    ({ countrySelect }) => ({       
        ...(countrySelect && {
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            marginTop: '-16px',
            marginBottom: '-10px',
            marginLeft: '-32px',
            marginRight: '-32px',
            padding: '16px 32px 10px'
        })
    })   
);

const EstimateBox = styled(Box)(
    ({ countrySelect }) => ({       
        ...(countrySelect && {
            display: 'flex',
            visibility: 'visible',
            marginLeft: '-32px',
            marginRight: '-32px',
            marginTop: '10px',
            borderRadius: '16px',
            flexDirection: 'column',
            alignItems: 'left',
            padding: '10px 32px',
            '@media (max-width:600px)': {
                padding: '10px 16px'
            },
            height: 'auto',
            overflow: 'hidden',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '330px',
            backgroundOrigin: 'content-box',
            backgroundPosition: '130px 70px'
        }),
        ...(!countrySelect && {
            display: 'none',
            visibility: 'hidden'
        }),
    })
);
 
export default function Map(props) {
    const mapContainer = useRef(true);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(1.5);
    const [eventSize, setEventSize] = useState(25);

    const [boxDisplayRisk, setBoxDisplayRisk] = useState(0);
    const [dateLastUpdated, setDateLastUpdated] = useState('');
    const [countrySelect, setCountrySelect] = React.useState(false);

    const valuetext = (value) => {
        return value;
    }

    const valueLabelFormat = (value) => {
        return value * 10; 
    }
    
    let data ='https://ppi-estimator.s3.amazonaws.com/data_'+ eventSize +'.fc.geojson'; // set datasource to depend on eventsize value

    const handleSliderChange = (e, value) => {
        setEventSize(value * 10); // set eventsize value on slider
    };

    const handleRegionSelect = (e, value) => {
        if (value) {
            let selectedbbx = turf.bbox(value); 
            if (props.windowDimension.winWidth < 600) { // mobile map display
                let filtersTopText = document.getElementById('filtersTopText');
                filtersTopText.style.display = 'none';
                filtersTopText.style.visibility = 'hidden';
                document.getElementById("filterBox").scrollIntoView(); // when the user selects a country hide the top text and jump to the map filters
                map.current.fitBounds(selectedbbx, { // on region select, zoom to region polygon for mobile map view 
                    padding: {
                        top: 0,
                        left: 100,
                        right: 100,
                        bottom: 500
                    } 
                });
                map.current.scrollZoom.disable(); // disable scrolling/zooming for mobile map view
                map.current.dragPan.disable(); // disable panning for mobile map view
            } else {
                map.current.fitBounds(selectedbbx, {padding: 200}); // on region select, zoom to region polygon 
            }
            setCountrySelect(true); // set to true so estimate component is displayed                            
            setBoxDisplayRisk(value.properties.risk); // set risk for selected country
            setDateLastUpdated(value.properties.DateReport); // set date last updated for selected country        
        } else {
            setCountrySelect(false); // set to false so estimate component closes
            map.current.fitBounds(map.current.getBounds());
        }
    }
    
    useEffect(() => {
        if (map.current) {
            // initialize map only once
            // if map already exists, do not redraw map, update source geojson only
            const geojsonSource = map.current.getSource('world');
            geojsonSource.setData(data);
            return;
        } 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/toothpick/cknjppyti1hnz17ocjat5chky', // @todo: create custom PPI account and map style
            center: [lng, lat],
            zoom: zoom,
            renderWorldCopies: false
        });

        map.current.addControl(new mapboxgl.NavigationControl());
        var clickedStateId = null;
        
        map.current.on('load', () => {            
            var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
            mapCanvas.style.width = '100%'; // set mapboxgl-canvas width to 100% so map width adjusts when sidebar is collapsed

            map.current.addSource('world', {
                'type': 'geojson',
                'data': data, // load geojson file here; @todo: swap this out for S3 bucket source
                'generateId': true
            });

            // add map layer for filled choropleth polygon regions
            map.current.addLayer({
                'id': 'world-fill',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    // option 1:
                    // this fill creates smooth gradients through value ranges
                    'fill-color': {
                        'property': 'risk',
                        'stops': [[0, '#eff5d9'], [1, '#d9ed92'], [25, '#99d98c'], [50, '#52b69a'], [75, '#168aad'], [99, '#1e6091'],[100, '#184e77']]
                      },
                    // option 2:
                    //this fill option creates strict steps between value ranges
                    // 'fill-color': [
                    //     'step',
                    //     ['get', 'risk'],
                    //     '#eff5d9',1,'#d9ed92',25,'#b5e48c',50,'#76c893',75,'#34a0a4',99,'#1a759f'
                    // ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'click'], false],
                        1,
                        0.9,
                    ],
                    'fill-antialias': true,
                },
                'filter': ['==', '$type', 'Polygon']
            }, 'road-simple');  

            // add map layer for region outlines
            map.current.addLayer({
                'id': 'world-outline',
                'type': 'line',
                'source': 'world',
                'paint': {
                    'line-color': '#000000',
                    'line-width': [
                        "interpolate", ["linear"], ["zoom"],
                        // line widths for zoom levels <3, 3-5, 5-8, 8-10, and 10+
                        3, 0.25,
                        5, 0.50,
                        8, 0.75,
                        10, 1
                    ],
                    'line-opacity': [
                        "interpolate", ["linear"], ["zoom"],
                        // line opacities for zoom levels <3, 3-5, 5-8, 8-10, and 10+
                        3, 0,
                        5, 0.25,
                        8, 0.5,
                        10, 0.75
                    ],
                },
                'filter': ['==', '$type', 'Polygon']
            }, 'road-simple');  
            
            // onClick behavior for a region: zoom and popup
            map.current.on('click', 'world-fill', function(e) {
                var popup = new mapboxgl.Popup({ offset: [0, -7] });
                map.current.getCanvas().style.cursor = 'pointer';
                var features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['world-fill'] 
                });
                var bbox = turf.bbox({
                    type: 'FeatureCollection',
                    features: features
                  });

                map.current.fitBounds(bbox, {padding: 200});    
    
                if (!features.length) {
                    return;
                } else {
                    if (clickedStateId) {
                        map.current.setFeatureState(
                            { source: 'world', id: clickedStateId },
                            { click: false }
                        );
                    }
                    clickedStateId = e.features[0].id;
                    map.current.setFeatureState(
                        { source: 'world', id: clickedStateId },
                        { click: true }
                    );
                }

                var feature = features[0];
                var displayRisk = feature.properties.risk;

                if (feature.properties.risk < 1) { 
                    displayRisk = '< 1'
                } else {
                    displayRisk = Math.round(displayRisk)
                }

                popup
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + feature.properties.RegionName + '</h3><p><strong>Risk: ' + displayRisk + '% </strong><br>' + 'Last Updated: ' + feature.properties.DateReport  + '</p>' )
                .addTo(map.current);
            });
    
        });
            
    });
    
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    /**
     * If the sidebar is closed, resize the map so the width does not cause the canvas to stretch
     */
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        if (!props.open) {
            map.current.resize();
        }
    });
    
    return (
        <div className="map">
            <div className="mapfilters">
                <Box>
                    <FilterBox id='filterBox' countrySelect={countrySelect}>
                        <div id='filtersTopText'>
                            <h3 className="serif">Select your event location and size</h3>
                            <p className='filtersQuestion'>Where will the event or activity take place and how many people will be attending?</p>
                        </div>
                        
                        <Grid container >
                            <Grid item xs={countrySelect ? 7 : 12} sm={12} className={styles.locationGrid} sx={{marginLeft: countrySelect && props.windowDimension.winWidth < 600 ? '-10px' : '0px'}}>
                                <h4 className={styles.locationText}><RoomOutlined className={styles.roomOutlined}/> LOCATION</h4>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={regions.features}
                                    getOptionLabel={(option) => option.properties.RegionName}
                                    onChange={handleRegionSelect}
                                    renderInput={(params) => <TextField fullWidth {...params} label="Search by country or region" />}
                                />
                            </Grid>
                            <Grid item xs={countrySelect ? 5 : 12} sm={12} sx={{ marginLeft: countrySelect && props.windowDimension.winWidth < 600 ? '10px' : '0px' }}>
                                <h4 className={styles.crowdSize}><PeopleAltOutlined className={styles.peopleAltOutlined}/> CROWD SIZE</h4>
                                <Slider
                                    aria-label="Restricted values"
                                    defaultValue={2.5}
                                    valueLabelFormat={valueLabelFormat}
                                    getAriaValueText={valuetext}
                                    step={null}
                                    valueLabelDisplay="on"
                                    marks={marks}
                                    onChange={handleSliderChange}
                                />
                            </Grid>
                        </Grid>                        
                    </FilterBox>

                    <EstimateBox id='Estimate' countrySelect={countrySelect} className={boxDisplayRisk < 1 ? styles.nodata : (boxDisplayRisk <= 25 ? styles.range1 : (boxDisplayRisk <= 50 ? styles.range3 : (boxDisplayRisk <= 75 ? styles.range4 : (boxDisplayRisk <= 99 ? styles.range5 : styles.range6))))}>
                        <h4 className={styles.estimateHeader}>
                            <CoronavirusIcon className={styles.mainIcons} />COVID-19 PRESENCE ESTIMATION IS:
                        </h4>
                        <h3 className={styles.estimateRange}>
                            {boxDisplayRisk < 1 ? 'Very Low' : (boxDisplayRisk <= 25 ? 'Low' : (boxDisplayRisk <= 50 ? 'Low-Mid' : (boxDisplayRisk <= 75 ? 'Mid-High' : (boxDisplayRisk <= 99 ? 'High' : 'Very High'))))}
                        </h3>
                        <h1>{boxDisplayRisk}% probable</h1>
                        <h4 className={styles.estimateText}>that at least ONE PERSON would be infected in the event
                            <Tooltip arrow sx={{marginTop: '-5px', color: 'inherit'}} title="This was calculated based on the number of reported cases in the last 14 days">
                                <IconButton>
                                    <InfoOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </h4>
                        <p>Updated {dateLastUpdated}</p>
                    </EstimateBox>

                    <Box sx={{display: (props.windowDimension.winWidth > 600) ? 'block' : 'none', visibility: (props.windowDimension.winWidth > 600) ? 'visible' : 'hidden'}}><Precautions winWidth={props.windowDimension.winWidth}/></Box>                    
                </Box>                                                       
            </div>
            <Box sx={{display: props.windowDimension.winWidth < 600 ? 'block' : 'none', visibility: props.windowDimension.winWidth < 600 ? 'visible' : 'hidden'}}><Precautions winWidth={props.windowDimension.winWidth}/></Box>          
            <div className="longlat">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <div id="mapLegend">
                <h5>Probability Estimate for Exposure Risk (%)</h5>
                <span className="nodata">&#x3c; 1%</span>
                <span className="range1">1 - 25 </span>
                <span className="range3">25 - 50 </span>
                <span className="range4">50 - 75 </span>
                <span className="range5">75 - 99 </span>
                <span className="range6">More than 99% </span>
            </div>
        </div>
    );
}
