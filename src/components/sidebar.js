import React, { useState } from 'react';  
import { Box } from '@mui/system';
import { 
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    IconButton,
    Theme
} from '@mui/material';

import {ExpandMore} from '@mui/icons-material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import {NavLink} from 'react-router-dom'

import {
    MapOutlined,
    BarChartOutlined,
    InfoOutlined,
    ContentCopy
} from '@mui/icons-material';

import clsx from "clsx";

import styles from '../css/sidebar.module.css';
 
export default function Sidebar() {
    //const classes = useStyles();

    const [expanded, setExpanded] = useState(true);

    const handleToggle = () => {
        setExpanded(!expanded);
    };
    
    return (
        
        <><Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box>
                <h1 className={styles.title}>COVID-19 Presence Estimator</h1>
                <h2 className={styles.subtitle}>for event planning</h2>
                <div className={styles.blurb}>
                    <p className={styles.serif}>Are you planning to host or attend a special event? Are you worried about someone bringing the virus to the occassion? We can help you estimate the probability.</p>
                    <p>Estimate the probability that one person could be infected with COVID-19 in the event, so you can take precautions and make safer decisions</p>
                </div>

                <MenuList className={styles.leftNav}>
                    <MenuItem
                        component={NavLink}
                        className={styles.leftNavItem}
                        activeclassname="active"
                        to="/"
                    >
                        <ListItemIcon>
                            <MapOutlined fontSize="small" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>MAP</ListItemText>
                    </MenuItem>

                    <MenuItem
                        component={NavLink}
                        className={styles.leftNavItem}
                        activeclassname="active"
                        to="/advanced"
                    >
                        <ListItemIcon>
                            <BarChartOutlined fontSize="small" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>ADVANCED DATA TOOL</ListItemText>
                    </MenuItem>

                    <MenuItem
                        component={NavLink}
                        className={styles.leftNavItem}
                        activeclassname="active"
                        to="/data"
                    >
                        <ListItemIcon>
                            <ContentCopy fontSize="small" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>DATA SOURCES</ListItemText>
                    </MenuItem>

                    <MenuItem
                        component={NavLink}
                        className={styles.leftNavItem}
                        activeclassname="active"
                        to="/about"
                    >
                        <ListItemIcon>
                            <InfoOutlined fontSize="small" style={{ color: 'white' }}/>
                        </ListItemIcon>
                        <ListItemText>ABOUT THE TOOL</ListItemText>
                    </MenuItem>
                </MenuList>
            </Box>
        </Collapse>
        <Box
            // className={clsx(classes.root, {
            //     [classes.pointer]: !expanded
            // })}
            onClick={handleToggle}
        >
            <Box display="flex" alignItems="center">
                <Box
                display="flex"
                alignItems="center"
                className={styles.expandIconBox}
                >
                <IconButton
                    size="small"
                    aria-expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ArrowBackIosNewOutlinedIcon
                    className={clsx(styles.expand, {
                        [styles.expandOpen]: expanded
                    })}
                    />
                </IconButton>
            </Box>
            </Box>
        </Box></>
    );
}
