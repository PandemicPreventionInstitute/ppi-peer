import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import turf from 'turf';
import Filters from './filters.js';
  
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // pulls Mapbox token from env file
 
export default function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(1.5);

    const eventSizeCallback = (eventSize) => {
        return;
    }

    const locationCallback = (location) => {
        return;
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
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
                'data': './constants/data_100.fc.geojson', // load geojson file here; @todo: swap this out for S3 bucket source
                'generateId': true
            });

            // add map layer for filled choropleth polygon regions
            map.current.addLayer({
                'id': 'world-fill',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    'fill-color': {
                        'property': 'risk',
                        'stops': [[0, '#eff5d9'], [1, '#d9ed92'], [25, '#99d98c'], [50, '#52b69a'], [75, '#168aad'], [99, '#1e6091'],[100, '#184e77']]
                      },
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
                        // zoom is 5 (or less) -> circle radius will be 1px
                        3, 0.25,
                        5, 0.75,
                        8, 1,
                        // zoom is 10 (or greater) -> circle radius will be 5px
                        10, 1.5
                    ],
                    'line-opacity': [
                        "interpolate", ["linear"], ["zoom"],
                        // zoom is 5 (or less) -> circle radius will be 1px
                        3, 0,
                        5, 0.25,
                        8, 0.5,
                        // zoom is 10 (or greater) -> circle radius will be 5px
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
                var coordinates = feature.geometry.coordinates;

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
                <Filters />
            </div>
            <div className="longlat">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <div id="mapLegend">
                <h5>Probability Estimate for Exposure Risk (%)</h5>
                <span class="nodata">&#x3c; 1%</span>
                <span class="range1">1 - 25 </span>
                <span class="range2">25 - 50 </span>
                <span class="range3">25 - 50 </span>
                <span class="range4">50 - 75 </span>
                <span class="range5">75 - 99 </span>
                <span class="range6">More than 99% </span>
            </div>
        </div>
    );
}
