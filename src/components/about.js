import React from 'react';
import styles from '../css/about.module.css';
import { Box } from '@mui/system';
import { 
    Grid   
   } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import maskedElbowBump from '../assets/masked-elbow-bump.jpeg';
   
export default function About() {
    
    return (
        <Grid sx={{ flexGrow: 1 }} container className={styles.about}>
            <Grid item xs={6}>
                <div>
                    <h1 className={styles.mainText}>PEER</h1>
                    <h3 className={styles.subText}>Probability Estimator for Exposure Risk: </h3>
                    <h3 className={styles.subText}>A COVID-19 calculator powered by the PPI and Georgia Tech</h3>
                </div>              
            </Grid>
            <Grid item xs={6}>
                <div className={styles.maskedElbowBump}>
                    <img className={styles.maskedElbowBump} src={maskedElbowBump} alt="Masked elbow bump" />
                </div> 
            </Grid>
            <Grid item xs={12}>
                <div>
                    <h3 className={styles.transitionText}>We envision a world with...</h3>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={styles.bottomGridItem}>
                    <ConnectWithoutContactIcon fontSize='large'/>
                    <h3>A connected, sustainable pandemic data ecosystem</h3>
                </div>                
            </Grid>
            <Grid item xs={4}>
                <div className={styles.bottomGridItem}>
                    <ConnectWithoutContactIcon fontSize='large'/>
                    <h3>Actionable, interpretable public health tools for all</h3>
                </div>                
            </Grid>
            <Grid item xs={4}>
                <div className={styles.bottomGridItem}>
                    <ConnectWithoutContactIcon fontSize='large'/>
                    <h3>Data for the entire globe</h3>
                </div>                
            </Grid>
            
            
            {/* <h2 className={styles.subText}>
            The Pandemic Prevention Institute and the Georgia Institute of Technology partnered to develop a digital tool that supports practical decision-making in the changing face of pathogen exposure. The PEER map is an exposure prevention planning tool designed to help users employ interventions that protect themselves and their communities against communicable diseases.
The latest version of our tool is an adaptation of the Event Risk Assessment Planning Tool by Georgia Tech and uses real-time COVID-19 data to estimate the probability that one or more infected individuals will be present at an event, given the event size and recently reported cases in the area. This approach is designed to empower users to make informed decisions.
            </h2> */}
        </Grid>
    );
}
