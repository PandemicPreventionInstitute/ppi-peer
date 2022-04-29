import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filters from './filters.js';
  
mapboxgl.accessToken = 'pk.eyJ1IjoidG9vdGhwaWNrIiwiYSI6ImNpczVlajdoODBhcXkyc28wdWJvOWhpcTUifQ.AU8-RSZrTkWidj7yDLPtMg';
 
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(1.5);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/toothpick/cknjppyti1hnz17ocjat5chky',
            center: [lng, lat],
            zoom: zoom,
            renderWorldCopies: false
        });

        map.current.addControl(new mapboxgl.NavigationControl());
        var clickedStateId = null
        
        map.current.on('load', () => {
            map.current.addSource('world', {
                'type': 'geojson',
                'data': './constants/data.fc.geojson'
            });

            map.current.addLayer({
                'id': 'world',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    'fill-color': {
                        'property': 'risk',
                        'stops': [[0, '#eff5d9'], [1, '#d9ed92'], [25, '#99d98c'], [50, '#52b69a'], [75, '#168aad'], [99, '#1e6091']]
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

            map.current.addLayer({
                'id': 'world-outline',
                'type': 'line',
                'source': 'world',
                'paint': {
                    'line-color': '#000000',
                    'line-width': [
                        "interpolate", ["linear"], ["zoom"],
                        // zoom is 5 (or less) -> circle radius will be 1px
                        3, 0,
                        5, 0.5,
                        8, 0.75,
                        // zoom is 10 (or greater) -> circle radius will be 5px
                        10, 1
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

            var popup = new mapboxgl.Popup({ offset: [0, -7] });
                    
            
            map.current.on('click', 'world', function(e) {
                map.current.getCanvas().style.cursor = 'pointer';
                var features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['world'] 
                });
        
                if (!features.length) {
                    return;
                } else {
                    console.log("Oh hello, ", features[0].properties.RegionName)
                    console.log("Oh hello ID: ", clickedStateId)
                    if (clickedStateId) {
                        map.current.setFeatureState(
                            { source: 'world', id: clickedStateId },
                            { click: false }
                        );
                    }
                    clickedStateId = e.features[0].properties.geoid;
                    map.current.setFeatureState(
                        { source: 'world', id: clickedStateId },
                        { click: true }
                    );
                }
        
        
                var feature = features[0];

                popup
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + feature.properties.RegionName + '</h3><p>Risk: ' + feature.properties.risk + '% <br>' + 'Last Updated: ' + feature.properties.DateReport  + '</p>' )
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
                <span class="nodata">No Data</span>
                <span class="range1">Less than 1% </span>
                <span class="range2">1 - 25 </span>
                <span class="range3">25 - 50 </span>
                <span class="range4">50 - 75 </span>
                <span class="range5">75 - 99 </span>
                <span class="range6">More than 99% </span>
            </div>
        </div>
    );
}
