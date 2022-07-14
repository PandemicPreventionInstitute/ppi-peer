import React from 'react';
import Sidebar from '../components/sidebar.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Click on METHODS button', () => {
    it('should be able to click on METHODS', async () => {
        
        // render Sidebar component
        render(<Router><Sidebar open={true} /></Router>);

        // Click MAP button
        fireEvent.click(screen.getByTestId("METHODS")); 
    });
});

describe('Click on ABOUT button', () => {
    it('should be able to click on ABOUT', async () => {
        
        // render Sidebar component 
        render(<Router><Sidebar open={true} /></Router>);

        // Click MAP button
        fireEvent.click(screen.getByTestId("ABOUT"));
    });
});

describe('Click on DATA button', () => {
    it('should be able to click on DATA', async () => {  

        // render Sidebar component
        render(<Router><Sidebar open={true} /></Router>);

        // Click MAP button
        fireEvent.click(screen.getByTestId("DATA SOURCES"));
    });
});
