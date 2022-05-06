import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import { Box } from '@mui/material';
import {Grid} from '@mui/material';

import Map from './components/map.js';
import About from './components/about.js';
import Data from './components/data.js';
import Advanced from './components/advanced.js';
import Sidebar from './components/sidebar.js';

import './App.css';
import styles from './css/sidebar.module.css';

function App() {
  return (
    <Box sx={{ display: 'flex' }} className="App">  
      <Sidebar className={styles.sidebar}/>
      <Box component="main" className={styles.mapbox} sx={{ flexGrow: 2, p: 0 }}>
        <Routes>
            <Route path="/" element={<Map />} />
            <Route path="about" element={<About />} />
            <Route path="advanced" element={<Advanced />} />
            <Route path="data" element={<Data />} />
        </Routes>
      </Box>
    </Box>
    // <Grid container className="App" spacing={0}>  
    //   <Grid item xs={12} sm='auto' md='auto' lg='auto'/* xs={12} sm={4} md={3} */>
    //     <Sidebar className={styles.sidebar}/>
    //   </Grid>
    //   <Grid item xs={12} sm='auto' md='auto' lg='auto'/* xs={12} sm={8} md={9} */ component="main" className={styles.mapbox} sx={{ flexGrow: 1, p: 0 }}>
    //     <Routes>
    //         <Route path="/" element={<Map />} />
    //         <Route path="about" element={<About />} />
    //         <Route path="advanced" element={<Advanced />} />
    //         <Route path="data" element={<Data />} />
    //     </Routes>
    //   </Grid>
    // </Grid>
  );
}

export default App;
