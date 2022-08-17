import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { Grid, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';

import Map from './components/map.js';
import About from './components/about.js';
import Data from './components/data.js';
import Sidebar from './components/sidebar.js';
import Methods from './components/methods.js';

import ReactGA from "react-ga";

import './App.css';
import styles from './css/sidebar.module.css';

function App() {

  /* Initialize Google Analytics for tracking */
  useEffect(() => { ReactGA.initialize('G-8YZYM2GQGD', { debug: false }); }, []);

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

  const SidebarToggle = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ open }) => ({  
        display: 'flex',
        alignItems: 'center',   
        ...(open && {
            justifyContent: 'flex-end'
        }),
        ...(!open && {
            justifyContent: 'flex-start'
        }),
    }),
  );

  const SidebarToggleIconClose = styled(ChevronLeftIcon)(() => ({
    fontSize: 40, 
    color: 'white'
  }));

  const SidebarToggleIconOpen = styled(ChevronRightIcon)(() => ({
    fontSize: 40, 
    color: 'white'
  }));

  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={12} sm={open ? 4.5 : 1} md={open ? 3 : 0.7} lg={open ? 2.4 : 0.5} className={styles.sidebar}>
          <SidebarToggle open={open}>
            <IconButton onClick={open ? handleSidebarClose : handleSidebarOpen} sx={{ display: (windowDimension.winWidth < 600) ?  'none' : 'flex'}}>
              {open ? <SidebarToggleIconClose /> : <SidebarToggleIconOpen />}
            </IconButton>
          </SidebarToggle>
          <Box> 
            <Sidebar open={open}/> 
          </Box>   
        </Grid>
        <Grid item xs={12} sm={open ? 7.5 : 11} md={open ? 9 : 11.3} lg={open ? 9.6 : 11.5} className='Main'>
          <Routes>
            <Route path="/" element={<Map open={open} windowDimension={windowDimension}/>} />
            <Route path="about" element={<About />} />
            <Route path="methods" element={<Methods />} />
            <Route path="data" element={<Data />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
