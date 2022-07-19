import * as React from 'react';
import Map from '../components/map.js';
import ShallowRenderer from 'react-shallow-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

const axios = require('axios');

const windowDimension = {
    winWidth: 1200,
    winHeight: 800
};

const renderer = new ShallowRenderer();
test('Map renders without crashing', () => {
    renderer.render(<Router><Map open={true} windowDimension={windowDimension}/></Router>);
});

test('S3 url to fetch the data is up and running', async() => {
    const apiUrl = "https://ppi-estimator.s3.amazonaws.com/globalDataWide.fgb";
    await axios.get(apiUrl)
        .then(res => {
        expect(res.data).toBeDefined();
        expect(res.status).toBeGreaterThanOrEqual(200);
        expect(res.status).toBeLessThan(300);
        })
});
