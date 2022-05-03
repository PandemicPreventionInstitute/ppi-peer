import React from 'react';
import { 
    Slider,
    TextField
} from '@mui/material';
import styles from '../css/filters.module.css';
import {
    PeopleAltOutlined,
    RoomOutlined,
    ShieldOutlined,
    ExpandMoreOutlined
} from '@mui/icons-material';
import mask from '../icons/icon_mask.png';
import socialDistance from '../icons/icon_distancing.png';
import handwashing from '../icons/icon_handwashing.png';
import outdoors from '../icons/icon_outdoors.png';
import sanitizer from '../icons/icon_sanitizer.png';
import vaccines from '../icons/icon_vaccines.png';

const marks = [
    {
      value: 0.1,
      label: '1',
    },
    {
      value: 0.2,
    },
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 2,
    },
    {
      value: 5,
    },
    {
      value: 10,
      label: '100',
    },
    {
      value: 15,
    },
    {
      value: 20,
      label: '200',
    },
    {
      value: 25,
    },
    {
      value: 50,
      label: '500',
    },
    {
      value: 100,
      label: '1000',
    },
  ];
  
  function valuetext(value) {
    return value;
  }
  
  function valueLabelFormat(value) {
    return value * 10; //marks.findIndex((mark) => mark.value === value) + 1;
  }
  
   
export default function Filters() {
    
    return (
      <>
        <div /* className="filters" */>
            <h3 className="serif">Select your event location and size</h3>
            <p>Where will the event or activity take place and how many people will be attending?</p>

            <h4><RoomOutlined fontSize="small" style={{ color: '#318AD0', marginBottom: -3 }} /> LOCATION</h4>
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="Search by country or region" 
                variant="outlined" 
            />

            <h4 style={{marginBottom: 40}}><PeopleAltOutlined fontSize="small" style={{ color: '#318AD0', marginBottom: -3 }} /> CROWD SIZE</h4>
            <Slider
                aria-label="Restricted values"
                defaultValue={10}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="on"
                marks={marks}
                markLabel={false}
            />
        </div>
        {/* Mina shenanigans starting here */}
        <div /* className="filters" */>
          <h4 style={{marginBottom: 40}}>
            <ShieldOutlined fontSize="small" style={{ color: '#318AD0', marginBottom: -3, marginRight: 5 }} /> TAKE THE RIGHT PRECAUTIONS 
            <ExpandMoreOutlined style={{ color: '#6C787F', marginBottom: -5 }} />
          </h4>
          <div className={styles.iconGrid}>
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={mask} alt="Use a mask" />
              </div>
              <div className={styles.precautionText}>Use a mask</div>
            </div>  
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={socialDistance} alt="Social distance" />
              </div>
              <div className={styles.precautionText}>Social distance</div>
            </div> 
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={handwashing} alt="Wash your hands" />
              </div>
              <div className={styles.precautionText}>Wash your hands</div>
            </div>  
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={outdoors} alt="Choose the outdoors" />
              </div>
              <div className={styles.precautionText}>Choose the outdoors</div>
            </div> 
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={sanitizer} alt="Use hand sanitizer" />
              </div>
              <div className={styles.precautionText}>Use hand sanitizer</div>
            </div>  
            <div style={{display: 'block'}}>
              <div className={styles.circle}>
                <img src={vaccines} alt="Get vaccinated" />
              </div>
              <div className={styles.precautionText}>Get vaccinated</div>
            </div>          
          </div>
        </div>
        </>
    );
}
