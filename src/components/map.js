import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import turf from 'turf';
import Precautions from './precautions';
import axios from 'axios';
import styles from '../css/filters.module.css';
import { 
    Autocomplete,
    Slider,
    TextField,
    Box,
    Grid,
    Backdrop,
    CircularProgress
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
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

import OnboardingSteps from './onboardingSteps';
import Onboarding from './onboarding.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // pulls Mapbox token from env file
const marks = require('../assets/eventSizes.json');

const FilterBox = styled(Box)(
    ({ countrySelect }) => ({       
        ...(countrySelect && {
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            marginTop: '-16px',
            marginBottom: '-30px',
            '@media (max-width: 600px)': {
                marginBottom: '-50px'
            },
            marginLeft: '-32px',
            marginRight: '-32px',
            padding: '16px 32px 40px'
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

const PrecautionsBox = styled(Box)(() => ({
    display: 'flex',
    visibility: 'visible',
    '@media (max-width: 600px)': {
        display: 'none',
        visibility: 'hidden'
    }
}));
 
const MobilePrecautionsBox = styled(Box)(() => ({
    display: 'flex',
    visibility: 'visible',
    '@media (min-width: 600px)': {
        display: 'none',
        visibility: 'hidden'
    },    
    flexDirection: 'column',
    alignItems: 'center'
}));

const OnboardingBox = styled(Box)(() => ({
    p: 1,  
    boxShadow: '0 0 10px rgba(0,0,0,0.2)', 
    borderRadius: '16px', 
    padding: '0px 20px 0px 10px',
    backgroundColor: 'white'
}));

const OnboardingPopper = styled(Popper)(({ theme }) => ({
    zIndex: 6, 
    width: 'auto', 
    maxWidth: '350px', 
    padding: '10px 0px',
    '&[data-popper-placement*="right"] .MuiPopper-arrow': {
        left: 0,
        marginLeft: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
            borderWidth: '1em 1em 1em 0',
            borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
        },
    },
    '&[data-popper-placement*="left"] .MuiPopper-arrow': {
        right: 0,
        marginRight: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
            borderWidth: '1em 0 1em 1em',
            borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
        },
    },
}));

const Arrow = styled('div')({
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  });

const scale = value => {
    const previousMarkIndex = Math.floor(value / 25);
    const previousMark = marks[previousMarkIndex];
    const remainder = value % 25;
    if (remainder === 0) {
        return previousMark.eventSize;
    }
    const nextMark = marks[previousMarkIndex + 1];
    const increment = (nextMark.eventSize - previousMark.eventSize) / 25;
    return remainder * increment + previousMark.eventSize;
};

const Popup = ({ featureProperties, displayRisk, expIntroductions, casesPer100k }) => (
    <div>
      <h3>{featureProperties.RegionName}</h3><br />
      <strong><p id='popup_risk'>Exposure Risk: {displayRisk}</p></strong>
      <strong><p id='infected_attendees'>Infected Attendees: {expIntroductions}</p></strong>
      <strong><p>Cases per 100k in the past 14 days: {casesPer100k}</p></strong>   
      <strong><p>Data Last Updated: {featureProperties.DateReport}</p></strong>
    </div>
);

export default function Map(props) {
    const mapContainer = useRef(true);
    const map = useRef(null);
    const [popupState, setPopupState] = useState(false);
    const [lng, setLng] = useState(20);
    const [lat, setLat] = useState(27);
    const [zoom, setZoom] = useState(2);
    const [loading, setLoading] = useState(true);
    const [boxDisplayRisk, setBoxDisplayRisk] = useState(0);
    const [dateLastUpdated, setDateLastUpdated] = useState('');
    const [infectedAttendees, setInfectedAttendees] = useState('');
    const [countrySelect, setCountrySelect] = useState(false);
    const [currentRegion, setCurrentRegion] = useState({
        type: 'Feature',
        geometry: [],
        properties: [],
    });
    const [filterState, setFilterState] = useState({
        region: {},
        size: 20
    })
    const filterStateRef = useRef(20);
    const [sliderValue, setSliderValue] = useState({
        size: 50
    })
    const [mapData, setMapData]=useState();

    const valuetext = (value) => {
        return value;
    }

    const valueLabelFormat = (value) => {
        return value;
    }
        // useEffect to fetch data on mount
    useEffect(() => {
        const getData = async () => {
        // 'await' the data
        const response = await axios.get("https://ppi-estimator.s3.amazonaws.com/globalDataWide.json", {
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // setFetchProgress(percentCompleted);
                if (percentCompleted === 100) {
                    setTimeout(() => {
                      setLoading(false);
                    }, 400);
                  }
                // @todo: use onDownloadProgress as value for a determinant progress bar loader
            }
        });
        // save data to state
        setMapData(response.data);
        setLoading(false);
        }

        getData()

    }, []);

    const handleSliderChange = (e, value) => {
        const markIndex = Math.floor(value / 25); // get slider index so we can get the event size
        const mark = marks[markIndex];
        const eventSize = mark.eventSize; // actual event size
        let newSize = 'risk_' + eventSize;
        let newVal = value;
        filterStateRef.current = eventSize; // update filter state reference for popup
        setFilterState({
            ...filterState,
            size: eventSize
        });
        setSliderValue({
            size: newVal
        });
        map.current.setPaintProperty('world-fill', 'fill-color', [
            'step',
            ['get', newSize],
            '#cccccc',-1,'#cccccc',0,'#eff5d9',1,'#d9ed92',25,'#76c893',50,'#34a0a4',75,'#1a759f',99,'#184e77']
        );
        setBoxDisplayRisk(currentRegion.properties[newSize]);  // update state and estimation
        let expIntroductionsSize = 'exp_introductions_' + (eventSize);
        let expIntroductions = currentRegion.properties[expIntroductionsSize];
        setInfectedAttendees(expIntroductions);

        // update popup risk and infected attendees if open
        if(popupState) {
            let popupRisk = document.getElementById('popup_risk');
            let risk = currentRegion.properties[newSize];
            let infectedAttendees = document.getElementById('infected_attendees');

            if (risk < 0) {
                risk = 'No data has been reported from this region within the last 14 days.';
                expIntroductions = 'N/A';
            }
            else if (risk < 1) {
                risk = '< 1%';
            } else if (risk > 99) {
                risk = '> 99%';
            } else {
                risk = Math.round(risk) + '%';
            }
            popupRisk.innerText = 'Exposure Risk: ' + risk;
            infectedAttendees.innerText = 'Infected Attendees: ' + expIntroductions;
        }       
    }

    const handleRegionSelect = (e, value) => {
        setFilterState({
            ...filterState,
            region: value
        })
        if (value) {
            setCountrySelect(true); // set to true so estimate component is displayed
            setCurrentRegion({
                ...currentRegion,
                type: value.type,
                geometry: value.geometry,
                properties: value.properties,
            }); // set as current region for slider handler
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
            let thisSize = 'risk_' + (filterState.size);
            setBoxDisplayRisk(value.properties[thisSize]); // set risk for selected country
            setDateLastUpdated(value.properties.DateReport); // set date last updated for selected country        
        } else {
            setCountrySelect(false); // set to false so estimate component closes
            map.current.fitBounds(map.current.getBounds());
        }
    }
    
    useEffect(() => {
        if (map.current && !loading) {
            // initialize map only once
            // if map already exists, do not redraw map, update source geojson only
            map.current.getSource('world').setData(mapData);
            return;
        } 
        
        map.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/toothpick/cknjppyti1hnz17ocjat5chky', // @todo: create PPI account and map style
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 10,
            minZoom: 2,
            renderWorldCopies: false
        });

        map.current.addControl(new mapboxgl.NavigationControl());
        var clickedStateId = null;
        
        map.current.on('load', () => {      
            map.current.addSource('world', {
                'type': 'geojson',
                'data': {mapData}, // load geojson file here; @todo: swap this out for S3 bucket source
                'generateId': true,
            });

            // add map layer for filled choropleth polygon regions
            map.current.addLayer({
                'id': 'world-fill',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    // option 1:
                    // this fill creates smooth gradients through value ranges
                    // 'fill-color': {
                    //     'property': 'risk_'+(filterState.size),
                    //     'stops': [[-1, '#cccccc'], [0, '#eff5d9'], [1, '#d9ed92'], [25, '#99d98c'], [50, '#52b69a'], [75, '#168aad'], [99, '#1e6091'],[100, '#184e77']]
                    //   },
                    // option 2:
                    //this fill option creates strict steps between value ranges
                    'fill-color': [
                        'step',
                        ['get', 'risk_'+(filterState.size)],
                        '#cccccc',-1,'#cccccc',0,'#eff5d9',1,'#d9ed92',25,'#76c893',50,'#34a0a4',75,'#1a759f',99,'#184e77'
                    ],
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
                        8, 0.5
                    ],
                },
                'filter': ['==', '$type', 'Polygon']
            }, 'road-simple');  
            
            // onClick behavior for a region: zoom and popup
            map.current.on('click', 'world-fill', function(e) {
                var popup = new mapboxgl.Popup({ offset: [0, -7] });
                map.current.getCanvas().style.cursor = 'pointer';
                setPopupState(true);
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
                // workaround for queryRenderedFeatures's nonstandard object returned
                let featureCopy = {
                    type: feature.type,
                    geometry: feature._geometry,
                    properties: feature.properties
                }
                let thisSize = 'risk_' + filterStateRef.current;
                setCurrentRegion(featureCopy);
                setCountrySelect(true);
                setDateLastUpdated(feature.properties.DateReport);
                setBoxDisplayRisk(feature.properties[thisSize]);
                let displayRisk = feature.properties[thisSize];
                console.log("this risk is: ", displayRisk);
                let expIntroductionsSize = 'exp_introductions_' + (filterStateRef.current);
                let expIntroductions = feature.properties[expIntroductionsSize];
                setInfectedAttendees(expIntroductions);
                let casesPer100k = Math.round(feature.properties.cases_per_100k_past_14_d);

                if (displayRisk < 0) {
                    displayRisk = 'No data has been reported from this region within the last 14 days.';
                    expIntroductions = 'N/A';
                    setInfectedAttendees('N/A');
                    casesPer100k = 'N/A';
                } else if (displayRisk < 1) {
                    displayRisk = '< 1%';
                } else if (displayRisk > 99) {
                    displayRisk = '> 99%';
                } else {
                    displayRisk = Math.round(displayRisk) + '%';
                }

                //create popup node and root
                const popupNode = document.createElement("div");     
                const popupRoot = ReactDOM.createRoot(popupNode); // Create a root.           
                popupRoot.render(
                <Popup
                    featureProperties={feature.properties}
                    displayRisk={displayRisk}
                    expIntroductions={expIntroductions}
                    casesPer100k={casesPer100k}
                />
                );
                
                popup
                .setLngLat(e.lngLat)
                .setDOMContent(popupNode)
                .addTo(map.current);

                popup.on('close', function(e) {
                    setPopupState(false);
                });
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

    const [locationPopperOpen, setLocationPopperOpen] = useState(false);
    const [crowdSizePopperOpen, setCrowdSizePopperOpen] = useState(false);
    const [mapControlPopperOpen, setMapControlPopperOpen] = useState(false);

    const [arrowRef1, setArrowRef1] = React.useState(null);
    const [arrowRef2, setArrowRef2] = React.useState(null);
    const [arrowRef3, setArrowRef3] = React.useState(null);

    const gridLocationRef = React.useRef();
    const gridCrowdSizeRef = React.useRef();

    const [locationAnchorEl, setLocationAnchorEl] = useState(null);
    const [crowdSizeAnchorEl, setCrowdSizeAnchorEl] = useState(null);
    const [mapControlAnchorEl, setMapControlAnchorEl] = useState(null);

    const handleTutorialStep1 = () => {
        setLocationAnchorEl(gridLocationRef.current);
        setLocationPopperOpen(true);  
    }

    const handleTutorialStep2 = () => {
        setCrowdSizeAnchorEl(gridCrowdSizeRef.current);
        setLocationPopperOpen(false);
        setCrowdSizePopperOpen(true);
    }

    const handleTutorialStep3 = () => {
        let mapControl = document.getElementsByClassName('mapboxgl-ctrl-top-right');
        setMapControlAnchorEl(mapControl[0]);
        setCrowdSizePopperOpen(false);
        setMapControlPopperOpen(true);
    }

    const handleLocationPopperClose = () => {
        setLocationPopperOpen(false);
    }

    const handleCrowdSizePopperClose = () => {
        setCrowdSizePopperOpen(false);
    }

    const handleMapControlPopperClose = () => {
        setMapControlPopperOpen(false);
    }

    return (
        <div className="map">
            <div>
                {props.windowDimension.winWidth > 600 ? <Onboarding handleTutorialStep1={handleTutorialStep1}/> : null}
            </div>
            { loading ? 
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                className="loadingBackdrop"
                open={loading}
              > 
                <CircularProgress size={100} color="inherit" />
              </Backdrop>

              : null 
            }
            <div className="mapfilters">
                <FilterBox id='filterBox' countrySelect={countrySelect}>
                    <div id='filtersTopText'>
                        <h3 className="serif">Select your event location and size</h3>
                        <p className='filtersQuestion'>Where will the event or activity take place and how many people will be attending?</p>
                    </div>
                    
                    <Grid container>
                        <Grid item xs={countrySelect ? 7 : 12} sm={12} ref={gridLocationRef} className={styles.locationGrid} sx={{marginLeft: countrySelect && props.windowDimension.winWidth < 600 ? '-10px' : '0px'}}>
                            <h4 className={styles.locationText}><RoomOutlined className={styles.roomOutlined}/> LOCATION</h4>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                name="region"
                                id="selector-region"
                                disabled={loading ? true : false}
                                options={loading ? null : mapData.features}
                                getOptionLabel={(option) => option.properties.RegionName}
                                onChange={handleRegionSelect}
                                renderOption = {(props, option) => { // use unique geoid as key to pacify MUI's unique key errors for autocomplete
                                    return (
                                        <li {...props} key={option.properties.geoid}>
                                            {option.properties.RegionName}
                                        </li>
                                    )
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} label={loading ? "Loading data ..." : "Search by country or region"} />}
                            />
                        </Grid>
                        <Backdrop open={locationPopperOpen}>
                            <OnboardingPopper 
                                open={locationPopperOpen} 
                                anchorEl={locationAnchorEl} 
                                placement='right' 
                                transition 
                                modifiers={[
                                    {
                                        name: 'arrow',
                                        enabled: true,
                                        options: {
                                            element: arrowRef1,
                                        }
                                    }
                                ]}
                            >                           
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps}>
                                <OnboardingBox>
                                    <Arrow className='MuiPopper-arrow' ref={setArrowRef1} />
                                    <OnboardingSteps step1={true} handleLocationPopperClose={handleLocationPopperClose} handleTutorialStep2={handleTutorialStep2}/>
                                </OnboardingBox>
                                </Fade>
                            )}
                            </OnboardingPopper>
                        </Backdrop>
                        <Grid item xs={countrySelect ? 5 : 12} sm={12} ref={gridCrowdSizeRef} sx={{ marginLeft: countrySelect && props.windowDimension.winWidth < 600 ? '10px' : '0px', paddingBottom: '10px' }}>
                            <h4 className={styles.crowdSize}><PeopleAltOutlined className={styles.peopleAltOutlined}/> CROWD SIZE</h4>
                            <Slider
                                aria-label="Restricted values"
                                id="selector-eventSize"
                                value={sliderValue.size}
                                name="size"
                                defaultValue={50}
                                disabled={loading ? true : false}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={valuetext}
                                step={null}
                                valueLabelDisplay="on"
                                marks={marks}
                                scale={scale}
                                min={0}
                                max={225}
                                onChange={handleSliderChange}
                                track={false}
                            />
                        </Grid>
                        <Backdrop open={crowdSizePopperOpen}>
                            <OnboardingPopper 
                            open={crowdSizePopperOpen} 
                            anchorEl={crowdSizeAnchorEl} 
                            placement='right' 
                            transition 
                            modifiers={[
                                {
                                    name: 'arrow',
                                    enabled: true,
                                    options: {
                                        element: arrowRef2,
                                    }
                                }
                            ]}>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps}>
                                <OnboardingBox>
                                    <Arrow className='MuiPopper-arrow' ref={setArrowRef2} />
                                    <OnboardingSteps step2={true} handleCrowdSizePopperClose={handleCrowdSizePopperClose} handleTutorialStep3={handleTutorialStep3}/>
                                </OnboardingBox>
                                </Fade>
                            )}
                            </OnboardingPopper>
                        </Backdrop>
                        
                    </Grid>                        
                </FilterBox>

                <EstimateBox id='Estimate' countrySelect={countrySelect} className={boxDisplayRisk < 0 ? styles.nocases : (boxDisplayRisk < 1 ? styles.range1 : (boxDisplayRisk <= 25 ? styles.range2 : (boxDisplayRisk <= 50 ? styles.range3 : (boxDisplayRisk <= 75 ? styles.range4 : (boxDisplayRisk <= 99 ? styles.range5 : styles.range6)))))}>
                    <h4 className={styles.estimateHeader}>
                        <CoronavirusIcon className={styles.mainIcons} />COVID-19 EXPOSURE RISK IS:
                    </h4>
                    <h3 className={styles.estimateRange}>
                        {boxDisplayRisk < 0 ? 'No Data' : (boxDisplayRisk < 1 ? 'Very Low' : (boxDisplayRisk <= 25 ? 'Low' : (boxDisplayRisk <= 50 ? 'Low-Mid' : (boxDisplayRisk <= 75 ? 'Mid-High' : (boxDisplayRisk <= 99 ? 'High' : 'Very High')))))}
                    </h3>
                    <h1>{boxDisplayRisk < 0 ? 'No Current Data' : (boxDisplayRisk < 1 ? '< 1% probable' : (boxDisplayRisk > 99 ? '> 99% probable' : Math.round(boxDisplayRisk) + '% probable'))}</h1>
                    {boxDisplayRisk >= 0 ? 
                        <div>
                            <h4 className={styles.estimateText}>that at least ONE PERSON would arrive infected to the event
                                <Tooltip arrow sx={{marginTop: '-5px', color: 'inherit'}} title="This was calculated based on the number of reported cases in the last 14 days">
                                    <IconButton>
                                        <InfoOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </h4>
                            <hr />
                            <h3 className={styles.infectedAttendees}>{infectedAttendees} attendees</h3>
                            <h4 className={styles.estimateTextAttendees}>would be expected to arrive infected to the event
                                <Tooltip arrow sx={{marginTop: '-5px', color: 'inherit'}} title="This was calculated based on the number of reported cases in the last 14 days">
                                    <IconButton>
                                        <InfoOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </h4>
                            <hr />
                        </div>
                    : <h4 className={styles.estimateText}>No data has been reported from this region within the last 14 days.</h4>
                    }
                    <p><strong>Data Last Updated:</strong> {dateLastUpdated}</p>
                </EstimateBox>

                <PrecautionsBox><Precautions winWidth={props.windowDimension.winWidth}/></PrecautionsBox>                                                                         
            </div>
            <MobilePrecautionsBox><Precautions winWidth={props.windowDimension.winWidth}/></MobilePrecautionsBox>         
            <div className="longlat">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div id="map" ref={mapContainer} className="map-container" />
            <Backdrop open={mapControlPopperOpen} sx={{zIndex: 6}}>
                <OnboardingPopper 
                    open={mapControlPopperOpen} 
                    anchorEl={mapControlAnchorEl} 
                    placement='left' 
                    transition 
                    modifiers={[
                        {
                            name: 'arrow',
                            enabled: true,
                            options: {
                                element: arrowRef3,
                            }
                        }
                    ]}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps}>
                        <OnboardingBox>
                            <Arrow className='MuiPopper-arrow' ref={setArrowRef3} />
                            <OnboardingSteps step3={true} handleMapControlPopperClose={handleMapControlPopperClose} />
                        </OnboardingBox>
                        </Fade>
                    )}
                </OnboardingPopper>
            </Backdrop>
            
            <div id="mapLegend">
                <h5>Probability Estimate for Exposure Risk (%)</h5>
                <span className="range1">&#x3c; 1%</span>
                <span className="range2">1 - 25 </span>
                <span className="range3">25 - 50 </span>
                <span className="range4">50 - 75 </span>
                <span className="range5">75 - 99 </span>
                <span className="range6">&#62; 99% </span>
                <span className="nocases">No cases reported in 14+ days.</span>
                <span className="nodata">No data available.</span>
            </div>
            <div id="loading" className="loading"></div>
        </div>
    );
}