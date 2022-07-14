import React from 'react';
import About from '../components/about.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('About page renders without crashing', async () => {
    render(<Router><About /></Router>);

    expect(screen.getByText('We envision a world with...')).toBeVisible();
});
