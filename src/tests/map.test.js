import * as React from 'react';
import Map from '../components/map.js';
import ShallowRenderer from 'react-shallow-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

const windowDimension = {
    winWidth: 1200,
    winHeight: 800
};

const renderer = new ShallowRenderer();
test('Map renders without crashing', () => {
    renderer.render(<Router><Map open={true} windowDimension={windowDimension}/></Router>);
});
