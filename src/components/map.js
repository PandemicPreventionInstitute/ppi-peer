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
                        'stops': [[0, '#efefef'], [1, '#d9ed92'], [25, '#99d98c'], [50, '#52b69a'], [75, '#168aad'], [99, '#1e6091']]
                      },
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        1
                    ],
                    'fill-antialias': true,
                    'fill-outline-color': {
                        'property': 'risk',
                        'stops':  [[0, '#cccccc'], [1, '#b5e48c'], [25, '#76c893'], [50, '#34a0a4'], [75, '#1a759f'], [99, '#1e6091']]
                      },
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
                }
        
                var feature = features[0];

                popup
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + feature.properties.RegionName + '</h3><p>' + feature.properties.risk + '</p>' + '<h3>' + feature.properties.DateReport + '</h3><p>' + feature.properties.country + '</p>' )
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
                <span class="range1">Less than 1% </span>
                <span class="range2">1 - 25 </span>
                <span class="range3">25 - 50 </span>
                <span class="range4">50 - 75 </span>
                <span class="range5">75 - 99 </span>
                <span class="range6">More than 99% </span>
                <span class="nodata">No Data</span>
            </div>
        </div>
    );
}
