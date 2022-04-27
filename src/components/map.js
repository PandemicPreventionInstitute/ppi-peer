import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filters from './filters.js';
  
mapboxgl.accessToken = 'pk.eyJ1IjoidG9vdGhwaWNrIiwiYSI6ImNpczVlajdoODBhcXkyc28wdWJvOWhpcTUifQ.AU8-RSZrTkWidj7yDLPtMg';
 
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12);
    const [lat, setLat] = useState(30);
    const [zoom, setZoom] = useState(1.5);
    let hoveredStateId = null;

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
        
        map.current.on('load', () => {
            map.current.addSource('world', {
                'type': 'geojson',
                'data': './constants/world.geojson'
            });

            map.current.addLayer({
                'id': 'world',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    'fill-color': '#44AABB',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ],
                    'fill-antialias': true,
                    'fill-outline-color': '#000000',
                },
                'filter': ['==', '$type', 'Polygon']
            }, 'road-simple');

            // map.current.on('mousemove', 'world', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             map.current.setFeatureState(
            //                 { source: 'world', id: hoveredStateId },
            //                 { hover: false }
            //             );
            //         }
            //         hoveredStateId = e.features[0].properties.GEOID;
            //         map.current.setFeatureState(
            //             { source: 'world', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            // map.current.on('mouseleave', 'world', () => {
            //     if (hoveredStateId !== null) {
            //         map.current.setFeatureState(
            //             { source: 'world', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });                

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
        </div>
    );
}
