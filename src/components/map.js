import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filters from './filters.js';

console.log(process.env.REACT_APP_MAPBOX_TOKEN);
  
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
 
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12);
    const [lat, setLat] = useState(30);
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
        map.current.on('load', () => {
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
