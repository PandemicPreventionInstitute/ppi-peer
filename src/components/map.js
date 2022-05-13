import React, { useRef, useEffect, useState, setState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import turf from 'turf';
import Precautions from './precautions';
import styles from '../css/filters.module.css';
import { 
    Autocomplete,
    Slider,
    TextField,
    Box
} from '@mui/material';
import {
    PeopleAltOutlined,
    RoomOutlined
} from '@mui/icons-material';
  
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // pulls Mapbox token from env file
const regions = require('../assets/regions.json');
const marks = require('../assets/eventSizes.json');
  
export default function Map(props) {
    const mapContainer = useRef(true);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(1.5);
    const [eventSize, setEventSize] = useState(25);

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
        if(value) {
            let selectedbbx = turf.bbox(value); 
            map.current.fitBounds(selectedbbx, {padding: 200}); // on region select, zoom to region polygon
        } else {
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
                <div>
                    <h3 className="serif">Select your event location and size</h3>
                    <p>Where will the event or activity take place and how many people will be attending?</p>

                    <h4><RoomOutlined className={styles.roomOutlined}/> LOCATION</h4>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={regions.features}
                        getOptionLabel={(option) => option.properties.RegionName}
                        onChange={handleRegionSelect}
                        renderInput={(params) => <TextField fullWidth {...params} label="Search by country or region" />}
                    />

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
                </div>
                <Precautions />
            </Box>
            </div>
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
