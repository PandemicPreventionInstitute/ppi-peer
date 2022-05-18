import React from 'react';
import styles from '../css/filters.module.css';
import { 
    IconButton,
} from '@mui/material';
import {
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
  
export default function Precautions() {
    const [open, setOpen] = React.useState(false);

    const handlePrecautionsOpen = () => {
      setOpen(true);
    };

    const handlePrecautionsClose = () => {
      setOpen(false);
    };
    
    return (
        <div id='Precautions'>
            <h4>
                <ShieldOutlined className={styles.roomOutlined}/> TAKE THE RIGHT PRECAUTIONS
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
    );
}
