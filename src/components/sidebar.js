import React from 'react';  
import { Box } from '@mui/system';
import { 
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';

import {NavLink} from 'react-router-dom'

import {
    MapOutlined,
    BarChartOutlined,
    InfoOutlined,
    ContentCopy
} from '@mui/icons-material';

import styles from '../css/sidebar.module.css';
 
export default function Sidebar(props) {
    
    return (
        <Box className={styles.sidebarBox}>
            <div className={props.open ? styles.showElement : styles.hideElement}>
                <h1 className={styles.title}>COVID-19 Presence Estimator</h1>
                <h2 className={styles.subtitle}>for event planning</h2>
                <div className={styles.blurb}>
                    <p className={styles.serif}>Are you planning to host or attend a special event? Are you worried about someone bringing the virus to the occassion? We can help you estimate the probability.</p>
                    <p>Estimate the probability that one person could be infected with COVID-19 in the event, so you can take precautions and make safer decisions</p>
                </div>
            </div>           
            <MenuList className={styles.leftNav}>
                <MenuItem 
                    component={NavLink} 
                    className={styles.leftNavItem} 
                    activeclassname="active"
                    to="/" 
                    >
                    <ListItemIcon>
                        <MapOutlined className={styles.navigationIcons} />
                    </ListItemIcon>
                    <ListItemText className={props.open ? styles.inherit : styles.hideElement}>MAP</ListItemText>
                </MenuItem>

                <MenuItem 
                    component={NavLink} 
                    className={styles.leftNavItem} 
                    activeclassname="active"
                    to="/advanced" 
                    >
                    <ListItemIcon>
                        <BarChartOutlined className={styles.navigationIcons}/>
                    </ListItemIcon>
                    <ListItemText className={props.open ? styles.inherit : styles.hideElement}>ADVANCED DATA TOOL</ListItemText>
                </MenuItem>

                <MenuItem 
                    component={NavLink} 
                    className={styles.leftNavItem} 
                    activeclassname="active"
                    to="/data" 
                    >
                    <ListItemIcon>
                        <ContentCopy className={styles.navigationIcons} />
                    </ListItemIcon>
                    <ListItemText className={props.open ? styles.inherit : styles.hideElement}>DATA SOURCES</ListItemText>
                </MenuItem>

                <MenuItem 
                    component={NavLink} 
                    className={styles.leftNavItem} 
                    activeclassname="active"
                    to="/about" 
                    >
                    <ListItemIcon>
                        <InfoOutlined className={styles.navigationIcons}/>
                    </ListItemIcon>
                    <ListItemText className={props.open ? styles.inherit : styles.hideElement}>ABOUT THE TOOL</ListItemText>
                </MenuItem>
            </MenuList>
        </Box>
    );
}
