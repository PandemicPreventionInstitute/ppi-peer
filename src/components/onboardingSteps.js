import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoomOutlined, PeopleAltOutlined, ZoomInOutlined } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from '../css/onboarding.module.css';
import Button from '@mui/material/Button';

const OnboardingBox = styled(Box)(() => ({       
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        width: '100%'
    })   
);

const Step1Box = styled(Box)(
    ({ step1 }) => ({  
        display: 'none',
        visibility: 'hidden', 
        ...(step1 && {
            paddingLeft: '10px',
            display: 'block',
            visibility: 'visible'
        })        
    })   
);

const Step2Box = styled(Box)(
    ({ step2 }) => ({  
        display: 'none',
        visibility: 'hidden', 
        ...(step2 && {
            paddingLeft: '10px',
            display: 'block',
            visibility: 'visible'
        })        
    })   
);

const Step3Box = styled(Box)(
    ({ step3 }) => ({  
        display: 'none',
        visibility: 'hidden', 
        ...(step3 && {
            paddingLeft: '10px',
            display: 'block',
            visibility: 'visible'
        })        
    })   
);

export default function OnboardingSteps(props) {
    return (
        <OnboardingBox>
            <OnboardingBox sx={{flexFlow: 'row nowrap'}}>
                <Box>
                    <RoomOutlined sx={{display: props.step1 ? 'block' : 'none', visibility: props.step1 ? 'visibile' : 'hidden'}}/>
                    <PeopleAltOutlined sx={{display: props.step2 ? 'block' : 'none', visibility: props.step2 ? 'visibile' : 'hidden'}}/>
                    <ZoomInOutlined sx={{display: props.step3 ? 'block' : 'none', visibility: props.step3 ? 'visibile' : 'hidden'}}/>
                </Box>              
                <Step1Box step1={props.step1 ? props.step1 : null}>
                    <h3 className="serif">Locate your area </h3>
                    <p>Type in the city, state, or country</p>
                </Step1Box> 
                <Step2Box step2={props.step2 ? props.step2 : null}>
                    <h3 className="serif">Choose event size </h3>
                    <p>How many people will be at your event or activity</p>
                </Step2Box> 
                <Step3Box step3={props.step3 ? props.step3 : null}>
                    <h3 className="serif">Map controls </h3>
                    <p>Use this controls to zoom in or zoom out, and center the map position to your location</p>
                </Step3Box> 
            </OnboardingBox>
                         
            <OnboardingBox sx={{flexFlow: 'row nowrap', justifyContent: 'space-between', width: '90%', marginLeft: '40px', alignContent: 'center'}}>
                <Box sx={{display: props.step1 ? 'flex' : 'none', visibility: props.step1 ? 'visibile' : 'hidden'}}>
                    <h4>1/3</h4>                                    
                </Box>
                <Box sx={{display: props.step2 ? 'flex' : 'none', visibility: props.step2 ? 'visibile' : 'hidden'}}>
                    <h4>2/3</h4>
                </Box>
                <Box sx={{display: props.step3 ? 'flex' : 'none', visibility: props.step3 ? 'visibile' : 'hidden'}}>
                    <h4>3/3</h4>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Button 
                        onClick={props.step1 ? props.handleLocationPopperClose : props.handleCrowdSizePopperClose} 
                        sx={{color: 'inherit', display: props.step3 ? 'none' : 'flex', visibility: props.step3 ? 'hidden' : 'visible'}}>SKIP ALL
                    </Button>
                    <Button 
                        sx={{display: props.step3 ? 'none' : 'flex', visibility: props.step3 ? 'hidden' : 'visible'}}
                        onClick={props.step1 ? props.handleTutorialStep2 : props.handleTutorialStep3} >
                        NEXT <ChevronRightIcon />
                    </Button>
                    <Button 
                        sx={{display: props.step3 ? 'block' : 'none', visibility: props.step3 ? 'visible' : 'hidden'}}
                        onClick={props.handleMapControlPopperClose} >
                        FINISH
                    </Button>
                </Box>             
            </OnboardingBox>
        </OnboardingBox>        
    )
};
