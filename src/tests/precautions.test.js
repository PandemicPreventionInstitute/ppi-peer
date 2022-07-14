import * as React from 'react';
import Precautions from '../components/precautions.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { render } from '@testing-library/react';

test('Precautions renders without crashing', () => {
    render(<Router><Precautions /></Router>);
});