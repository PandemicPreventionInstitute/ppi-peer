import * as React from 'react';
import Methods from '../components/methods.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('Methods renders without crashing and shows How PEER Works', () => {
    render(<Router><Methods /></Router>);

    expect(screen.getByText('How PEER works')).toBeVisible();
});