import React from 'react';
import styles from '../css/about.module.css';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import maskedElbowBump from '../assets/masked-elbow-bump.jpeg';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import connection from '../assets/connection-svgrepo-com.svg';
import weather from '../assets/rain-weather-svgrepo-com.svg';
import world from '../assets/worldwide-global-svgrepo-com.svg';

import { GAaboutEventTracker } from './analyticsTracking';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const VisionCard = styled(Card)(() => ({
    padding: '0px',
    '& .MuiCardContent-root:last-child': {
        padding: '5px'
    }
}));

const defaultTheme = createTheme();
const theme = createTheme({
    breakpoints: {
      values: {
        ...defaultTheme.breakpoints.values,
        xwidedesktop: 2000
      },
    },
  });
   
export default function About() {

    /* Handling for connect card */
    const [expandedConnect, setExpandedConnect] = React.useState(false);
    const handleExpandedClickConnect = () => {
        if (expandedConnect === false) {
            GAaboutEventTracker('About Page', 'Connected Data Dcosystem'); // Google Analytics tracking
        }
        setExpandedConnect(!expandedConnect);
    }; 

    /* Handling for tools card */
    const [expandedTools, setExpandedTools] = React.useState(false);
    const handleExpandedClickTools = () => {
        if (expandedTools === false) {
            GAaboutEventTracker('About Page', 'Public Health Tools'); // Google Analytics tracking
        }
        setExpandedTools(!expandedTools);
    };       

    /* Handling for data card */
    const [expandedData, setExpandedData] = React.useState(false);
    const handleExpandedClickData = () => {
        if (expandedData === false) {
            GAaboutEventTracker('About Page', 'Global Data'); // Google Analytics tracking
        }
        setExpandedData(!expandedData);
    };      
    
    return (
        <ThemeProvider theme={theme}>
            <Grid sx={{ flexGrow: 1 }} container>
                <Grid item xs={12} xwidedesktop={6}>
                    <div>
                        <h1 className={styles.mainText}>PEER - Probability Estimator for Exposure Risk:</h1>
                        <h3 className={styles.subText}>A COVID-19 calculator powered by the PPI and Georgia Tech</h3>
                        <p className={styles.smallText}>The Probability Estimator for Exposure Risk (PEER) is a prevalence estimation tool that
                         pulls data from across the globe and translates it into granular and interpretable metrics so that public health 
                         decision-makers can perform event risk assessment. This version of PEER uses real-time COVID-19 case data and event 
                         size to estimate the probability that one or more infected individuals will be present at an event and the expected 
                         number of attendees arriving infected.</p>
                        <p className={styles.smallText}>This tool leverages peer-reviewed methodologies from collaborators at the 
                         Georgia Institute of Technology integratingit with a further focus on user-centered design to improve usability and 
                         interpretability. PEER demonstrates the possibility of a world where, by translating data and science into actionable 
                         technologies, decision-support tools around infectious disease risk can be as well-understood and accessible as 
                         hurricane forecasts.</p>
                    </div>          
                </Grid>
                <Grid item xs={0} xwidedesktop={6} sx={{textAlign: 'center'}}>
                    <img className={styles.maskedElbowBumpLarge} src={maskedElbowBump} alt='Masked elbow bump' />
                </Grid>
                <Grid item xs={12} sx={{height: 'auto', marginBottom: '5px'}} >
                    <div>
                        <h3 className={styles.transitionText}>We envision a world with...</h3>
                    </div>
                </Grid>
                <Grid item xs={12} xl={4} className={styles.bottomGridBox}>
                    <div>
                        <VisionCard>
                            <CardContent sx={{height: '230px'}}>
                                <img className={styles.connection} src={connection} alt='Connected people' />
                                <h3 className={styles.visionsText}>
                                A connected, sustainable pandemic data ecosystem
                                    <ExpandMore
                                    expand={expandedConnect}
                                    onClick={handleExpandedClickConnect}
                                    aria-expanded={expandedConnect}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                </h3>
                            </CardContent>                   
                            <Collapse in={expandedConnect} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        Countless impactful innovations developed by academic researchers struggle to reach sustainable 
                                        application at-scale. In the fields of pandemic preparedness and communicable disease, this 
                                        problem is only more pronounced. Further, these fields need sustainable coordination and innovation 
                                        but are often fragmented and underfunded, leaving many projects competing with one another 
                                        and lacking the software infrastructure to be maintained long-term.
                                    </Typography>
                                    <Typography paragraph>
                                        Our collaboration with Georgia Tech seeks to take on this challenge. 
                                        Precisely because of its public-facing impact ({'>'}16M visitors and {'>'}60M risk estimates thus far), 
                                        the Event Risk Assessment Planning Tool by Georgia Tech has highlighted how investments in pandemic 
                                        data collection and integration can be communicated to the public with interpretable and actionable 
                                        real-time metrics. We also want to spotlight shortcomings in similar global tools (such as, data 
                                        dashboards) to convey the time-sensitive opportunity to expand such approaches globally. 
                                        Rather than introduce another tool, our hope is that the PPI can build on what already exists in the 
                                        Event Risk Tool by focusing on user-centered product design and a robust production-ready code base 
                                        while enabling Georgia Tech to focus on advancing the science of COVID-19 prevalence estimation and 
                                        risk assessment. We see PEER, which aggregates subnational case data from around the world, as a first 
                                        step towards developing a pandemic data ecosystem capable of addressing critical questions across scales 
                                        and geographies.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </VisionCard>
                    </div>            
                </Grid>
                <Grid item xs={12} xl={4} className={styles.bottomGridBox}>
                    <div>
                        <VisionCard>
                            <CardContent sx={{height: '230px'}}>
                                <img className={styles.weather} src={weather} alt="Weather app icon" ></img>
                                <h3 className={styles.visionsText}>
                                Actionable, interpretable public health tools for all
                                    <ExpandMore
                                    expand={expandedTools}
                                    onClick={handleExpandedClickTools}
                                    aria-expanded={expandedTools}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                </h3>
                            </CardContent>
                            <Collapse in={expandedTools} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        The situation with COVID-19 is constantly changing. Restrictions and mask mandates have been rescinded 
                                        in places, and yet we know novel variants will continue to drive surges of infection. 
                                        Without clear policy guidelines to inform behavior, the onus is on individuals and communities to 
                                        determine when COVID-19 poses a threat, and when it doesn’t. To navigate this uncertainty, this 
                                        data-driven tool – PEER – helps users stay safe while returning a sense of normalcy to their everyday lives.
                                    </Typography>
                                    <Typography paragraph>
                                        This is only the beginning. Just as we use probabilistic forecasts of the weather to decide if we need 
                                        to carry an umbrella or avoid the roads altogether, decision-makers from neighborhoods to nations 
                                        need tools to make real-time, data-driven, evaluations regarding COVID-19. Envision checking your 
                                        smartphone, being presented with the risk that someone would arrive infected to an event you are 
                                        planning, and using this information to decide whether to move the event outdoors, require a 
                                        pre-event COVID-19 test, or cancel altogether. The PEER COVID-19 Calculator is a way of demonstrating 
                                        the possibility of a world where decision-support tools around infectious 
                                        disease risk become as well-understood and accessible as hurricane tracking or traffic alerts.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </VisionCard>
                    </div>            
                </Grid>
                <Grid item xs={12} xl={4} className={styles.bottomGridBox}>
                    <div>
                        <VisionCard>
                            <CardContent sx={{height: '230px'}}>
                                <img className={styles.world} src={world} alt="Global map" ></img>
                                <h3 className={styles.visionsText}>
                                    Data for the entire globe
                                    <ExpandMore
                                    expand={expandedData}
                                    onClick={handleExpandedClickData}
                                    aria-expanded={expandedData}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                </h3>
                            </CardContent>               
                            <Collapse in={expandedData} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        Just as clearly as the PEER COVID-19 calculator presents the opportunities available with high quality 
                                        and interpretable data, it highlights what stands in our way. We are unable to make risk calculations 
                                        for so many countries in the world because the data that’s needed doesn’t exist! This tool serves 
                                        as a reminder that while many high-income countries in North America and Europe live in relative 
                                        awareness of the trajectory of COVID-19, most of the world does not. We hope PEER will help 
                                        spur increased data sharing to enable more equitable access to tools like these.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </VisionCard>
                    </div>            
                </Grid>
            </Grid>
        </ThemeProvider>       
    );
}
