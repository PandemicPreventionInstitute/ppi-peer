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
    padding: '24px 12px',
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
                    <p className={styles.serif}>An innovative tool for contextualizing the probability of COVID-19 exposure.</p>
                    <p>Decision making relies on accurate information and interpretable metrics. But for most, metrics such as daily reported 
                        cases and test positivity rates do not easily translate to risk assessment. PEER bridges this gap —translating data 
                        into clear information to assess the risk posed by an event.</p>
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

                {/* <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/advanced" 
                    >
                    <SidebarMenuItemIcon>
                        <BarChartOutlined />
                    </SidebarMenuItemIcon>
                    <SidebarMenuItemText open={params.open}>ADVANCED DATA TOOLS</SidebarMenuItemText>
                </SidebarMenuItem> */}

                <SidebarMenuItem 
                    component={NavLink} 
                    activeclassname="active"
                    to="/data" 
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
