import React from 'react';
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
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const startTutorial = () => {
    handleClose();
    props.handleTutorialStep1();
  }

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked); 
    if (event.target.checked) {
        localStorage.setItem('checked', JSON.stringify(checked));
    }  
  };

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
                        <img src={maskedElbowBump} className={styles.image} />
                    </div>
                    <h1 className={styles.welcome}>Welcome to the COVID-19 Presence Estimator for Event Planning! </h1>
                    <h3 className={styles.dialogText}>Are you planning to host or attend an event? </h3>
                    <p className={styles.dialogText}>Learn how to navigate through this tool and understand the probability of <b>at least one person 
                        being infected with COVID-19 at an event or activity</b>.  It takes only three easy steps!</p>
                </div>
            </DialogContent>
            <DialogActions>
                <div>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'do not show again' }}                       
                    /> Don't show me again
                </div>
                <div>
                    <Button onClick={handleClose} className={styles.skip}>SKIP</Button>
                    <Button onClick={startTutorial}>TAKE THE TOUR</Button>
                </div>              
                
            </DialogActions>
        </OnboardingDialog>
    </div>
  );
}
