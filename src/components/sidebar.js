import React, { useState, useEffect } from 'react'; 
import { Box } from '@mui/system';
import { 
    ListItemText,
    ListItemIcon,
    IconButton
} from '@mui/material';
import {NavLink} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import {
    MapOutlined,
    BarChartOutlined,
    InfoOutlined,
    ContentCopy
} from '@mui/icons-material';
import styles from '../css/sidebar.module.css';
import Map from './map';
import { resizeMapClose } from './map';

/**
 * Sidebar width
 */
const drawerWidth = '20%';

/**
 * 
 * @param {*} theme 
 * Sidebar opened styling
 */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowy: 'auto',
  
});

/**
 * 
 * @param {*} theme 
 * Sidebar closed styling
 */
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  }
});

/**
 * Sidebar button and icon styling
 */
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1, 1)
}));

/**
 * Sidebar styling
 */
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    boxSizing: 'border-box',   
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .MuiPaper-root': {
        background: '#318AD0',
        color: '#ffffff'
      }
    }),
    ...(!open && {
      ...closedMixin(theme),   
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .MuiPaper-root': {
        background: '#318AD0',
        color: '#ffffff'
      }
    }),
  }),
);
 
export default function Sidebar() {

    const [open, setOpen] = React.useState(true);

    /**
     * Open sidebar
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    /**
     * Collapse sidebar
     */
    const handleDrawerClose = () => {
        setOpen(false);
        /* MINA TO FIX */
        //useResizeMapClose();
        /* Map.map.current.panBy([100 * -1, 0], {
            duration: 500,
            easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
          }); */
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
     * Used to adjust sidebar state depending on window screen width size
     */
    useEffect(() => {
        window.addEventListener('resize', detectSize);

        if (windowDimension.winWidth < 1000) {
            handleDrawerClose();
        } else {
            handleDrawerOpen();
        }

        return () => {
            window.removeEventListener('resize', detectSize);
        }
    }, [windowDimension]);
    
    return (
        <Drawer variant='permanent' open={open} id='sidebar'>
            <DrawerHeader>
                <IconButton id='sidebarToggle' onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? <ChevronLeftIcon className={styles.chevronIcon}/> : <ChevronRightIcon className={styles.chevronIcon}/>}
                </IconButton>
            </DrawerHeader>
            <Box sx={{ display: open ? 'block' : 'none', alignItems: 'center' }}>
                <div>                   
                    <h1 className={styles.title}>COVID-19 Presence Estimator</h1>
                    <h2 className={styles.subtitle}>for event planning</h2>                                                    
                </div>               
                <div className={styles.blurb}>
                    <p className={styles.serif}>Are you planning to host or attend a special event? Are you worried about someone bringing the virus to the occassion? We can help you estimate the probability.</p>
                    <p>Estimate the probability that one person could be infected with COVID-19 in the event, so you can take precautions and make safer decisions</p>
                </div>
            </Box>  
            <List>
                {['MAP', 'ADVANCED DATA TOOL', 'DATA SOURCES', 'ABOUT THE TOOL'].map((text, index) => (
                    <ListItemButton
                    activeclassname='active'
                    component={NavLink}
                    to={index === 0 ? '/' : index === 1 ? '/advanced' : index === 2 ? '/data' : '/about'}                
                    key={text}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5
                    }}
                    >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: '#ffffff'
                            }}
                        >
                            {index === 0 ? <MapOutlined /> : index === 1 ? <BarChartOutlined /> : index === 2 ? <ContentCopy /> : <InfoOutlined />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>       
    );
}
