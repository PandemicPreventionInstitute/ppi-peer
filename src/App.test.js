import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import * as React from 'react';
import ShallowRenderer from 'react-shallow-renderer';

const renderer = new ShallowRenderer();

it('renders without crashing', () => {
  renderer.render(<Router><App /></Router>);
});
