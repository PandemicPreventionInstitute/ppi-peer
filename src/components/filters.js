import React from 'react';
import { 
    Slider,
    TextField,
    IconButton,
    Box
} from '@mui/material';
import styles from '../css/filters.module.css';
import {
    PeopleAltOutlined,
    RoomOutlined,
    ShieldOutlined,
    ExpandMoreOutlined,
    ExpandLessOutlined
} from '@mui/icons-material';
import mask from '../assets/icon_mask.png';
import socialDistance from '../assets/icon_distancing.png';
import handwashing from '../assets/icon_handwashing.png';
import outdoors from '../assets/icon_outdoors.png';
import sanitizer from '../assets/icon_sanitizer.png';
import vaccines from '../assets/icon_vaccines.png';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

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

    const [open, setOpen] = React.useState(false);

    const handlePrecautionsOpen = () => {
      setOpen(true);
    };

    const handlePrecautionsClose = () => {
      setOpen(false);
    };
    
    return (
      <Box>
        <div>
            <h3 className="serif">Select your event location and size</h3>
            <p>Where will the event or activity take place and how many people will be attending?</p>

            <h4><RoomOutlined className={styles.roomOutlined}/> LOCATION</h4>
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="Search by country or region" 
                variant="outlined" 
            />

            <h4 className={styles.crowdSize}><PeopleAltOutlined className={styles.peopleAltOutlined}/> CROWD SIZE</h4>
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

        <div id='Estimate' className={styles.estimateBox} /* style={{ backgroundColor: '#fef0d9', padding: '0px 0px !important', width: '100%'}} */>
          <Box >
            <h4 className={styles.estimateHeader}>
              <CoronavirusIcon className={styles.mainIcons} />COVID-19 PRESENCE ESTIMATION IS:
            </h4>
          </Box>
        </div>
        
        <div id='Precautions'>
          <h4 className={styles.precautionHeader}>
            <ShieldOutlined className={styles.mainIcons}/>TAKE THE RIGHT PRECAUTIONS
            <IconButton aria-label="open precautions" className={styles.expandButton} onClick={open ? handlePrecautionsClose : handlePrecautionsOpen}>
              <ExpandMoreOutlined className={styles.expandOutlined} style={{ display: !open ? 'block' : 'none' }} />
              <ExpandLessOutlined className={styles.expandOutlined} style={{ display: open ? 'block' : 'none' }} />
            </IconButton>
          </h4>
          <div className={styles.iconGrid} style={{display: open ? 'grid' : 'none'}}>
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={mask} alt="Use a mask" />
              </div>
              <div className={styles.precautionText}>Use a mask</div>
            </div>  
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={socialDistance} alt="Social distance" />
              </div>
              <div className={styles.precautionText}>Social distance</div>
            </div> 
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={handwashing} alt="Wash your hands" />
              </div>
              <div className={styles.precautionText}>Wash your hands</div>
            </div>  
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={outdoors} alt="Choose the outdoors" />
              </div>
              <div className={styles.precautionText}>Choose the outdoors</div>
            </div> 
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={sanitizer} alt="Use hand sanitizer" />
              </div>
              <div className={styles.precautionText}>Use hand sanitizer</div>
            </div>  
            <div className={styles.iconBlock}>
              <div className={styles.circle}>
                <img src={vaccines} alt="Get vaccinated" />
              </div>
              <div className={styles.precautionText}>Get vaccinated</div>
            </div>          
          </div>
        </div>
      </Box>
    );
}
