import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filters from './filters.js';
import styles from '../css/sidebar.module.css';
import Drawer from './sidebar';
  
//mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken='pk.eyJ1IjoibWluYW1vdXNlOTciLCJhIjoiY2wycDRkcDc0MDN6MTNrcXZ3dnVrdnRmYyJ9.BlWon0Tsj-UygLC4IOQeVA';

export function useResizeMapClose() {
    const map = useRef(null);
    if (!map.current) return;
    map.panBy([100*-1, 0], { 
        duration: 500,
        easing: (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t 
      });
}

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12);
    const [lat, setLat] = useState(30);
    const [zoom, setZoom] = useState(2);

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

            var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
            mapCanvas.style.width = '100%'; // set mapboxgl-canvas width to 100% so map width adjusts when sidebar is collapsed

            /* MINA SHENANIGANS */
            var sidebarToggle = document.getElementById('sidebarToggle');
            sidebarToggle.onClick = () => {
                map.current.resize();
            };

            // map.current.addSource('eu', {
            //     'type': 'geojson',
            //     'data': './constants/eu.geojson'
            // });

            // map.current.addSource('usa', {
            //     'type': 'geojson',
            //     'data': './constants/usa.geojson'
            // });

            map.current.addSource('world', {
                'type': 'geojson',
                'data': './constants/world.geojson'
            });

            // map.current.addLayer({
            //     'id': 'eu',
            //     'type': 'fill',
            //     'source': 'eu',
            //     'paint': {
            //         'fill-color': '#44AABB',
            //         'fill-opacity': 0.25,
            //         'fill-antialias': true,
            //         'fill-outline-color': '#000000',
            //     },
            //     'filter': ['==', '$type', 'Polygon']
            // }, 'road-simple');

            // map.current.addLayer({
            //     'id': 'usa',
            //     'type': 'fill',
            //     'source': 'usa',
            //     'paint': {
            //         'fill-color': '#44AABB',
            //         'fill-opacity': 0.45,
            //         'fill-antialias': true,
            //         'fill-outline-color': '#000000',
            //     },
            //     'filter': ['==', '$type', 'Polygon']
            // }, 'road-simple');

            map.current.addLayer({
                'id': 'world',
                'type': 'fill',
                'source': 'world',
                'paint': {
                    'fill-color': '#44AABB',
                    'fill-opacity': 0.45,
                    'fill-antialias': true,
                    'fill-outline-color': '#000000',
                },
                'filter': ['==', '$type', 'Polygon']
            }, 'road-simple');

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

    /* MINA SHENANIGANS ALL BELOW HERE */

    /* useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        const sidebar = document.querySelector('.sidebar');
        const directionMultiplier = sidebar.classList.contains('open') ? 1 : -1;
        map.current.panBy([100*directionMultiplier, 0], { 
            duration: 500,
            easing: (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t 
          });
    }); */

    /* useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        console.log(Drawer.open);
        const directionMultiplier = Drawer.open ? 1 : -1;
        map.current.panBy([100*directionMultiplier, 0], { 
            duration: 500,
            easing: (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t 
        });
    }) */

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        var sidebar = document.getElementById('sidebar');
        if (sidebar.offsetWidth < 300) {
            map.current.resize();
        }

        /* var sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.onClick = () => {
            map.current.resize();
        }; */
    }); 
    
    return (
        <div className="map" id="map">
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
