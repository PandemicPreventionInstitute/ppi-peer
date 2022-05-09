import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import { 
  Grid
 } from '@mui/material';

import Map from './components/map.js';
import About from './components/about.js';
import Data from './components/data.js';
import Advanced from './components/advanced.js';
import Sidebar from './components/sidebar.js';
import MapViz from './components/mapviz.js';

import './App.css';
import styles from './css/sidebar.module.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} md={3} className={styles.sidebar}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={styles.mapbox}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="about" element={<About />} />
            <Route path="advanced" element={<Advanced />} />
            <Route path="data" element={<MapViz />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
