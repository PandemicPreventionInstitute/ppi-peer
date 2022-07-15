import * as React from 'react';
import Data from '../components/data.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('Data renders without crashing and shows Data Sources title', () => {
    render(<Router><Data /></Router>);

    expect(screen.getByText('Data Sources')).toBeVisible();
});