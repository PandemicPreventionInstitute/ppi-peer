import React from 'react';
import styles from '../css/about.module.css';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import maskedElbowBump from '../assets/masked-elbow-bump.jpeg';
import BuildIcon from '@mui/icons-material/Build';
import PublicIcon from '@mui/icons-material/Public';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import creditCard from '../assets/credit_card.png';

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
   
export default function About() {

    /* Handling for tools modal */
    const [expandedTools, setExpandedTools] = React.useState(false);
    const handleExpandedClickTools = () => {
        setExpandedTools(!expandedTools);
      };   

    /* Handling for connect modal */
    const [expandedConnect, setExpandedConnect] = React.useState(false);
    const handleExpandedClickConnect = () => {
        setExpandedConnect(!expandedConnect);
      };   

    /* Handling for data modal */
    const [expandedData, setExpandedData] = React.useState(false);
    const handleExpandedClickData = () => {
        setExpandedData(!expandedData);
      };   
    
    return (
        <Grid sx={{ flexGrow: 1 }} container className={styles.about}>
            <Grid item xs={12} sm={12} md={8} lg={7}>
                <div>
                    <h1 className={styles.mainText}>PEER - Probability Estimator for Exposure Risk:</h1>
                    <h3 className={styles.subText}>A COVID-19 calculator powered by the PPI and Georgia Tech</h3>
                    <p className={styles.smallText}>The Pandemic Prevention Institute and the Georgia Institute of Technology 
                    partnered to develop a digital tool that supports practical decision-making in the changing face of pathogen exposure. 
                    The PEER map is an exposure prevention planning tool designed to help users employ interventions that protect 
                    themselves and their communities against communicable diseases.The latest version of our tool is an adaptation of the 
                    Event Risk Assessment Planning Tool by Georgia Tech and uses real-time COVID-19 data to estimate the probability that 
                    one or more infected individuals will be present at an event, given the event size and recently reported 
                    cases in the area. This approach is designed to empower users to make informed decisions.
                    </p>
                </div>              
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={5} className={styles.topTextBox}>
                <div className={styles.maskedElbowBump}>
                    <img className={styles.maskedElbowBump} src={maskedElbowBump} alt='Masked elbow bump' />
                </div> 
            </Grid>
            <Grid item xs={12} sm={12}>
                <div>
                    <h3 className={styles.transitionText}>We envision a world with...</h3>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} className={styles.bottomGridBox}>
                <div className={styles.bottomGridItem}>
                    {/* <IconButton role='button' color='inherit' onClick={handleConnectClickOpen}>
                        <ConnectWithoutContactIcon fontSize='large'/>
                        <h3 className={styles.visionsText}>A connected, sustainable pandemic data ecosystem</h3>
                    </IconButton>
                    <Dialog onClose={handleConnectClose} open={expandedConnect}>
                        <div className={styles.modal}>
                            <div>
                                <p>Countless impactful innovations developed by academic researchers struggle to reach sustainable 
                                    application at-scale. In the fields of pandemic preparedness and communicable disease, this 
                                    problem is only more pronounced. Further, these fields need sustainable coordination and innovation 
                                    but are often fragmented and underfunded, leaving many projects competing with one another 
                                    and without long-term homes.
                                </p>
                            </div>
                            <div>
                                <p>Our collaboration with Georgia Tech seeks to take on this challenge. 
                                    Precisely because of its public-facing impact ({'>'}16M visitors and {'>'}60M risk estimates thus far), 
                                    the Event Risk Assessment Planning Tool by Georgia Tech has highlighted how investments in pandemic 
                                    data collection and integration can be communicated to the public with interpretable and actionable 
                                    real-time metrics. We also want to spotlight shortcomings in similar global tools (such as, data 
                                    dashboards) to convey the time-sensitive opportunity to expand such approaches globally. 
                                    Rather than introduce another tool, our hope is that the PPI can build on what already exists in the 
                                    Event Risk Tool by focusing on user-centered product design while enabling Georgia Tech to focus 
                                    on advancing the science of COVID-19 prevalence estimation and risk assessment.
                                </p>
                            </div>  
                        </div>                                            
                    </Dialog>                                     */}
                    <Card /* sx={{ maxWidth: 345 }} */>    
                        {/* <CardHeader
                            avatar={
                                <CardMedia
                                component="img"
                                image={creditCard}
                                alt="Credit card"                           
                            />
                            }
                            action={
                                <ExpandMore
                                expand={expandedConnect}
                                onClick={handleExpandedClickConnect}
                                aria-expanded={expandedConnect}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            }
                            title="A connected, sustainable pandemic data ecosystem"
                        />                   */}
                        <CardContent>
                            <img className={styles.creditCard} src={creditCard} alt="Credit card" ></img>
                            <h3 className={styles.visionsText}>
                            A connected, sustainable pandemic data ecosystem
                            {/* <CardActions disableSpacing> */}
                                <ExpandMore
                                expand={expandedConnect}
                                onClick={handleExpandedClickConnect}
                                aria-expanded={expandedConnect}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            {/* </CardActions> */}
                            </h3>
                        </CardContent>
                        
                        <Collapse in={expandedConnect} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>
                            {/* <div className={styles.modal}> */}
                                <div>
                                    <p>Countless impactful innovations developed by academic researchers struggle to reach sustainable 
                                        application at-scale. In the fields of pandemic preparedness and communicable disease, this 
                                        problem is only more pronounced. Further, these fields need sustainable coordination and innovation 
                                        but are often fragmented and underfunded, leaving many projects competing with one another 
                                        and without long-term homes.
                                    </p>
                                </div>
                                <div>
                                    <p>Our collaboration with Georgia Tech seeks to take on this challenge. 
                                        Precisely because of its public-facing impact ({'>'}16M visitors and {'>'}60M risk estimates thus far), 
                                        the Event Risk Assessment Planning Tool by Georgia Tech has highlighted how investments in pandemic 
                                        data collection and integration can be communicated to the public with interpretable and actionable 
                                        real-time metrics. We also want to spotlight shortcomings in similar global tools (such as, data 
                                        dashboards) to convey the time-sensitive opportunity to expand such approaches globally. 
                                        Rather than introduce another tool, our hope is that the PPI can build on what already exists in the 
                                        Event Risk Tool by focusing on user-centered product design while enabling Georgia Tech to focus 
                                        on advancing the science of COVID-19 prevalence estimation and risk assessment.
                                    </p>
                                </div>  
                            {/* </div> */}
                            </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>                
            </Grid>
            <Grid item xs={12} sm={12} className={styles.bottomGridBox}>
                <div className={styles.bottomGridItem}>
                    {/* <IconButton role='button' color='inherit' onClick={handleToolsClickOpen}>
                        <BuildIcon fontSize='large'/>
                        <h3 className={styles.visionsText}>Actionable, interpretable public health tools for all</h3> 
                    </IconButton>
                    <Dialog onClose={handleToolsClose} open={expandedTools}>
                        <div className={styles.modal}>
                            <div>
                                <p>The situation with COVID-19 is constantly changing. Restrictions and mask mandates have been rescinded 
                                    in places, and yet we know novel variants will continue to drive surges of infection. 
                                    Without clear policy guidelines to inform behavior, the onus is on individuals to determine when 
                                    COVID-19 poses a threat, and when it doesn’t. To navigate this uncertainty, this data-driven tool – 
                                    PEER – helps users stay safe while returning a sense of normalcy to their everyday lives.
                                </p>
                            </div>
                            <div>
                                <p>This is only the beginning. Just as we use probabilistic forecasts of the weather to decide if we need 
                                    to carry an umbrella or avoid the roads altogether, decision-makers from neighborhoods to nations 
                                    need tools to make real-time, data-driven, evaluations regarding COVID-19. Envision checking your 
                                    smartphone, being presented with the risk that someone would arrive infected to an event you are 
                                    planning, and using this information to decide whether to move the event outdoors, require a 
                                    pre-event COVID-19 test, or cancel altogether. The PEER COVID-19 Calculator is a way of demonstrating 
                                    the possibility of a world where decision-support tools around infectious 
                                    disease risk become as well-understood and accessible as hurricane tracking or traffic alerts.
                                </p>
                            </div>  
                        </div>                                            
                    </Dialog>                                     */}
                </div>                
            </Grid>
            <Grid item xs={12} sm={12} className={styles.bottomGridBox}>
                <div className={styles.bottomGridItem}>
                    {/* <IconButton role='button' color='inherit' onClick={handleDataClickOpen}>
                        <PublicIcon fontSize='large'/>
                        <h3 className={styles.visionsText}>Data for the entire globe</h3>
                    </IconButton>   
                    <Dialog onClose={handleDataClose} open={expandedData}>
                        <div className={styles.modal}>
                            <p>Just as clearly as the PEER COVID-19 calculator presents the opportunities available with high quality 
                                and interpretable data, it highlights what stands in our way. We are unable to make risk calculations 
                                for so many countries in the world because the data that’s needed doesn’t exist! This tool serves 
                                as a reminder that while many high-income countries in North America and Europe live in relative 
                                awareness of the trajectory of COVID-19, most of the world does not. We hope PEER will help 
                                spur increased data sharing to enable more equitable access to tools like these.
                            </p>
                        </div>                                            
                    </Dialog>                  */}
                </div>                
            </Grid>
        </Grid>
    );
}
