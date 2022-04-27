import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filters from './filters.js';
// import WorldData from 'https://ppi-estimator.s3.amazonaws.com/data.fc.fgb';
import geobuf from 'geobuf';
import { PublicOff } from '@mui/icons-material';
  
mapboxgl.accessToken = 'pk.eyJ1IjoidG9vdGhwaWNrIiwiYSI6ImNpczVlajdoODBhcXkyc28wdWJvOWhpcTUifQ.AU8-RSZrTkWidj7yDLPtMg';
// var geojson = geobuf.decode(new PublicOff(WorldData));
 
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12);
    const [lat, setLat] = useState(30);
    const [zoom, setZoom] = useState(1.5);
    // let hoveredStateId = null;
    // console.log("Hello big guy: ", geojson);

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
                'data': './constants/data.fc.geojson'
            });

            map.current.addLayer({
                'id': 'world',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    'fill-color': {
                        'property': 'risk',
                        'stops': [[0, 'YELLOW'], [1, 'pink'], [5, 'red']]
                      },
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
            
            map.current.on("mousemove", function (e) {
                var features = map.current.queryRenderedFeatures(e.point, {
                    layers: ["world"]
                });
    
                if (features.length) {
                    //show name and value in sidebar
                    document.getElementById('tooltip-name').innerHTML = features[0].properties.RegionName;
                    document.getElementById('tooltip').innerHTML = features[0].properties.DateReport;
                    //for troubleshooting - show complete features info
                    //document.getElementById('tooltip').innerHTML = JSON.stringify(features, null, 2);
                } else {
                    //if not hovering over a feature set tooltip to empty
                    document.getElementById('tooltip-name').innerHTML = "";
                    document.getElementById('tooltip').innerHTML = "";
                }
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
            <div id="tooltip-name"></div>
            <div id='tooltip'></div>
        </div>
    );
}
