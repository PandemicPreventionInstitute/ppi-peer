import React from 'react';
import styles from '../css/filters.module.css';
import { styled } from '@mui/material/styles';
import { 
    IconButton,
    Box
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
import vaccines from '../assets/icon_vaccines.png';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const PrecautionsBox = styled(Box)(({ open }) => ({   
        '@media (max-width:600px)': {
            margin: '-20px 0px',
            bottom: '0px',
            position: 'fixed',
            height: 'auto',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            padding: '0px 12px',
            left: 'auto',        
            width: 'auto',
            alignItems: 'center',
            ...(open && {
                zIndex: 5
            }),
            ...(!open && {
                zIndex: 3
            })
        }  
    })
);

export function PrecautionsContent(props) {
    return (
        <div className={styles.iconGrid} style={{display: props.open ? 'grid' : 'none'}}>
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
                <div className={styles.groupSizeCircle}>
                    <GroupsOutlinedIcon className={styles.groupSize}/>
                </div>
                <div className={styles.precautionText}>Reduce your group size</div>
            </div>  
            <div className={styles.iconBlock}>
                <div className={styles.circle}>
                    <img src={vaccines} alt="Get vaccinated" />
                </div>
                <div className={styles.precautionText}>Get vaccinated</div>
            </div>
        </div>
    )
}
  
export default function Precautions(props) {
    const [openUp, setOpenUp] = React.useState(false);
    const [openDown, setOpenDown] = React.useState(false);

    const handlePrecautionsOpenUp = () => {
      setOpenUp(!openUp);
    };

    const handlePrecautionsOpenDown = () => {
      setOpenDown(!openDown);
    };
    
    return (
        <PrecautionsBox open={openUp}>
            <PrecautionsContent open={openUp} /> 
            <h4 className={styles.precautionsLabel}>
                <ShieldOutlined className={styles.roomOutlined}/> TAKE THE RIGHT PRECAUTIONS
                <IconButton aria-label="open precautions" className={styles.expandButton} onClick={(props.winWidth < 600) ? handlePrecautionsOpenUp : handlePrecautionsOpenDown}>
                    <ExpandMoreOutlined className={styles.expandOutlined} style={{ display: ((!openDown && (props.winWidth > 600)) || ((props.winWidth < 600) && openUp)) ? 'block' : 'none' }} />
                    <ExpandLessOutlined className={styles.expandOutlined} style={{ display: ((openDown && (props.winWidth > 600)) || ((props.winWidth < 600) && !openUp)) ? 'block' : 'none' }} />
                </IconButton>
            </h4>
            <PrecautionsContent open={openDown} />
        </PrecautionsBox>
    );
}
