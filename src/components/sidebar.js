import * as React from 'react';  
import { Box } from '@mui/system';
import { 
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {NavLink} from 'react-router-dom'

import {
    MapOutlined,
    BarChartOutlined,
    InfoOutlined,
    ContentCopy
} from '@mui/icons-material';

import styles from '../css/sidebar.module.css';


const SidebarMenuItem = styled(MenuItem)(() => ({
    padding: '17px 12px',
    borderRadius: '12px 0 0 12px'
}));

const SidebarMenuItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: 'left',
    fontSize: 'x-large',
    color: 'white'
}));

const SidebarTextBox= styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ open }) => ({       
        ...(open && {
            display: 'block',
            visibility: 'visible',
            '@media (max-width: 600px)': {
                marginBottom: '0px'
            }
        }),
        ...(!open && {
            display: 'none',
            visibility: 'hidden'
        }),
    }),
);

const SidebarMenuItemText = styled(ListItemText, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ open }) => ({       
        ...(open && {
            display: 'inherit',
            visibility: 'inherit',
        }),
        ...(!open && {
            display: 'none',
            visibility: 'hidden'
        }),
    }),
);
 
export default function Sidebar(params) {

    return (
        <Box className={styles.sidebarBox}>
            <SidebarTextBox open={params.open}>
                <h1 className={styles.title}>COVID-19 Probability Estimator</h1>
                <h2 className={styles.subtitle}>for Exposure Risk (PEER)</h2>
                <div className={styles.blurb}>
                    <p className={styles.serif}>A tool for contextualizing the probability of COVID-19 exposure.</p>
                    <p className={styles.description}>PEER translates COVID-19 data into accurate and interpretable information for assessing risk.</p>
                </div>  
            </SidebarTextBox>  
            <MenuList sx={{paddingLeft: '5%'}}>
                <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/" 
                    >
                    <SidebarMenuItemIcon>
                        <MapOutlined />
                    </SidebarMenuItemIcon>
                    <SidebarMenuItemText open={params.open}>MAP</SidebarMenuItemText>
                </SidebarMenuItem>

                <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/methods" 
                    data-testid="METHODS"
                    >
                    <SidebarMenuItemIcon>
                        <BarChartOutlined />
                    </SidebarMenuItemIcon>
                    <SidebarMenuItemText open={params.open}>METHODS</SidebarMenuItemText>
                </SidebarMenuItem> 

                <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/data" 
                    data-testid="DATA SOURCES"
                    >
                    <SidebarMenuItemIcon>
                        <ContentCopy />
                    </SidebarMenuItemIcon>
                    <SidebarMenuItemText open={params.open}>DATA SOURCES</SidebarMenuItemText>
                </SidebarMenuItem>

                <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/about" 
                    data-testid="ABOUT"
                    >
                    <SidebarMenuItemIcon>
                        <InfoOutlined />
                    </SidebarMenuItemIcon>
                    <SidebarMenuItemText open={params.open}>ABOUT THE TOOL</SidebarMenuItemText>
                </SidebarMenuItem>
            </MenuList>
        </Box>
    );
}
