import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoomOutlined, PeopleAltOutlined, ZoomInOutlined } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';

const OnboardingBox1 = styled(Box)(() => ({       
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        width: '100%'
    })   
);

const OnboardingBox2 = styled(Box)(() => ({       
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexFlow: 'row nowrap', 
        justifyContent: 'space-between', 
        width: '90%', 
        marginLeft: '40px', 
        alignContent: 'center'
    })   
);

const StepBox = styled(Box)(() => ({ 
        paddingLeft: '10px'  
    })         
);

export default function OnboardingSteps(props) {
    return (
        <OnboardingBox1>
            <OnboardingBox1 sx={{flexFlow: 'row nowrap'}}>
                <Box>
                    {props.step1 ? <RoomOutlined /> : null}
                    {props.step2 ? <PeopleAltOutlined /> : null}
                    {props.step3 ? <ZoomInOutlined /> : null}
                </Box>            
                {props.step1 ? 
                <StepBox>
                    <h3 className="serif">Locate your area </h3>
                    <p>Type in the city, state, or country</p>
                </StepBox> : null}
                {props.step2 ?
                <StepBox>
                    <h3 className="serif">Choose event size </h3>
                    <p>How many people will be at your event or activity</p>
                </StepBox> : null}
                {props.step3 ? 
                <StepBox>
                    <h3 className="serif">Map controls </h3>
                    <p>Use this controls to zoom in or zoom out, and center the map position to your location</p>
                </StepBox> : null}
            </OnboardingBox1>
                         
            <OnboardingBox2>
                <Box>
                    {props.step1 ? <h4>1/3</h4> : null}
                    {props.step2 ? <h4>2/3</h4> : null}
                    {props.step3 ? <h4>3/3</h4> : null}
                </Box>
                {props.step3 ? 
                    (<Box sx={{display: 'flex'}}>              
                        <Button 
                        onClick={props.handleMapControlPopperClose} >
                        FINISH
                        </Button>
                    </Box>) : 
                    (<Box sx={{display: 'flex'}}>
                        <Button 
                            onClick={props.step1 ? props.handleLocationPopperClose : props.handleCrowdSizePopperClose} 
                            sx={{color: 'inherit'}}>SKIP ALL
                        </Button>
                        <Button 
                            onClick={props.step1 ? props.handleTutorialStep2 : props.handleTutorialStep3} >
                            NEXT <ChevronRightIcon />
                        </Button>
                    </Box>)}            
            </OnboardingBox2>
        </OnboardingBox1>        
    )
};
