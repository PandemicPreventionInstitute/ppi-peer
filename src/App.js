import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Map from './components/map.js';
import About from './components/about.js';
import Data from './components/data.js';
import Advanced from './components/advanced.js';
import Sidebar from './components/sidebar.js';
import MapViz from './components/mapviz.js';

import './App.css';
import styles from './css/sidebar.module.css';

function App() {

  const [open, setOpen] = React.useState(true);

  /**
   * Open sidebar
   */
  const handleSidebarOpen = () => {
      setOpen(true);
  };

  /**
   * Collapse sidebar
   */
  const handleSidebarClose = () => {
      setOpen(false);
  };

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  /**
   * Get the current window's screen size
   */
  const detectSize = () => {
      detectHW({
          winWidth: window.innerWidth,
          winHeight: window.innerHeight,
      });        
  };

  /**
   * If window's screen size is xs, then set 'open' to true so the sidebar doesn't collapse in mobile view
   */
  useEffect(() => {
    window.addEventListener('resize', detectSize);

    if (windowDimension.winWidth < 600) {
      handleSidebarOpen();
    }

    return () => {
        window.removeEventListener('resize', detectSize);
    }
  }, [windowDimension]); 

  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={12} sm={open ? 2.4 : 0.7} md={open ? 2.4 : 0.7} className={styles.sidebar}>
          <div className={open ? 'sidebarButtonOpen' : 'sidebarButtonClosed'}>
            <IconButton onClick={open ? handleSidebarClose : handleSidebarOpen} sx={{ display: (windowDimension.winWidth < 600) ?  'none' : 'flex'}}>
              {open ? <ChevronLeftIcon className={styles.chevronIcon}/> : <ChevronRightIcon className={styles.chevronIcon}/>}
            </IconButton>
          </div>
          <div className={open ? 'sidebarOpen' : 'sidebarClosed'}> 
            <Sidebar open={open}/> 
          </div>                 
        </Grid>
        <Grid item xs={12} sm={open ? 9.6 : 11.3} md={open ? 9.6 : 11.3} className={styles.mapbox}>
          <Routes>
            <Route path="/" element={<Map open={open}/>} />
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
