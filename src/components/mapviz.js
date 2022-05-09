import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import turf from 'turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // pulls Mapbox token from env file

export default class MapViz extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 42.35,
      zoom: 1.5,
      renderWorldCopies: false,
      eventSize: 50,
      location: null,
      clickedState: '',
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom, renderWorldCopies } = this.state;
    var clickedStateId = null
    
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/toothpick/cknjppyti1hnz17ocjat5chky',
      center: [lng, lat],
      zoom: zoom,
      renderWorldCopies: renderWorldCopies
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
        map.addSource('world', {
            'type': 'geojson',
            'data': './constants/data_'+this.state.eventSize+'.fc.geojson', // load geojson file here; @todo: swap this out for S3 bucket source
            'generateId': true
        });

        // add map layer for filled choropleth polygon regions
        map.addLayer({
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
                    1,
                ],
                'fill-antialias': true,
            },
            'filter': ['==', '$type', 'Polygon']
        }, 'road-simple');  

        // add map layer for region outlines
        map.addLayer({
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
        map.on('click', 'world-fill', function(e) {
            var popup = new mapboxgl.Popup({ offset: [0, -7] });
            map.getCanvas().style.cursor = 'pointer';
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['world-fill'] 
            });
            var bbox = turf.bbox({
                type: 'FeatureCollection',
                features: features
              });

            map.fitBounds(bbox, {padding: 200});    

            if (!features.length) {
                return;
            } else {
                if (clickedStateId) {
                    map.setFeatureState(
                        { source: 'world', id: clickedStateId },
                        { click: false }
                    );
                }
                clickedStateId = e.features[0].id;
                map.setFeatureState(
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
            .addTo(map);

            console.log(feature.properties.RegionName)

            this.setState({
                clickedState: feature.properties.RegionName,
            })
        });

    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom, clickedState } = this.state;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}<br/>
          Selected Region: {clickedState}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}
