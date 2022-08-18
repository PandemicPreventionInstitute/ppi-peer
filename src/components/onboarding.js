import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import maskedElbowBump from '../assets/masked-elbow-bump.jpeg';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../css/onboarding.module.css';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useLocalStorage } from './localStorage';
import { GAeventTracker } from './analyticsTracking';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OnboardingDialog = styled(Dialog)(() => ({       
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        '& .MuiDialogContent-root': {
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        '& .MuiDialogActions-root': {
            justifyContent: 'space-between'
        }
    })   
);

export default function Onboarding(props) {
  const [open, setOpen] = useState(true); // onboarding dialog open/close state
  const [checked, setChecked] = useState(false); // checkbox state for the UI
  const [isAccessible, setIsAccessible] = useState(true); // local storage accessibility state
  const [localCheck, setLocalCheck] = useLocalStorage("localCheck", false, setIsAccessible); // checkbox state for local storage

  const handleClose = () => {
    GAeventTracker('Onboarding', 'Onboarding Welcome Closed'); // google analytics tracking
    setOpen(false);
    if (checked) { // set the checkbox state in local storage
        setLocalCheck(true);
    } else {
        setLocalCheck(false);
    }
  };

  const startTutorial = () => {
    handleClose();
    props.handleTutorialStep1();
  }

  const handleChange = (event) => {
    GAeventTracker('Onboarding', 'Onboarding Dont Show Again Check'); // google analytics tracking
    setChecked(event.target.checked); // only set the UI checkbox
  };

  if (!localCheck) {
    return ( 
        <div id='OnboardingDialog' style={{display: 'flex'}}>
            <OnboardingDialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="welcome-onboarding-dialog"
            >
                <DialogTitle>{open ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: '#318AD0',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                </DialogTitle>
                <DialogContent>
                    <div className={styles.dialogContent}>
                        <div className={styles.imageRoot}>
                            <img src={maskedElbowBump} className={styles.image} alt='Masked elbow bump'/>
                        </div>
                        <h1 className={styles.welcome}>Welcome to the COVID-19 Probability Estimator for Exposure Risk (PEER)! </h1>
                        <h3 className={styles.dialogText}>Navigate our decision-support tool, integrating empirical evidence with public health 
                        preparedness.</h3> 
                        <p className={styles.dialogText}>PEER leverages data, science, and technology to quickly estimate the probability that one or more infected
                         individuals will be present at an event or social gathering given the size and reported cases in the area.  
                         It takes only three easy steps!</p>
                    </div>
                </DialogContent>
                <DialogActions>
                    {isAccessible ? 
                        (
                        <div>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'do not show again' }}                       
                            /> Don't show me again
                        </div>
                        ) : <div />
                    }
                    <div>
                        <Button onClick={handleClose} className={styles.skip}>SKIP</Button>
                        <Button onClick={startTutorial}>TAKE THE TOUR</Button>
                    </div>              
                    
                </DialogActions>
            </OnboardingDialog>
        </div>
      );
  } else {
      return null;
  }
}
