import React from 'react';  
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

const drawerWidth = '20%';

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    display: 'block',
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? <ChevronLeftIcon fontSize="large"/> : <ChevronRightIcon fontSize="large"/>}
                </IconButton>
            </DrawerHeader>
            <Box sx={{ display: open ? 'block' : 'none' }}>
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
                    activeclassname="active"
                    component={NavLink}
                    className={styles.leftNavItem}
                    to={index === 0 ? "/" : index === 1 ? "/advanced" : index === 2 ? "/data" : "/about"}                
                    key={text}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
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
