import * as React from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const heights = [120, 30, 90, 70, 90, 100, 150, 30, 50, 100, 80, 80];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  color: theme.palette.text.secondary
}));
   
export default function Data() {
    
    return (
        <Box className="data" sx={{ width: '95%', minHeight: 377 }}>
            <h1>Data Sources</h1>
            <Masonry columns={{xs: 1, sm: 2, md: 3}} spacing={2} sx={{ marginTop: 5 }}>
                {heights.map((height, index) => (
                    <Paper key={index}>
                        <StyledAccordion sx={{ minHeight: height }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' component='div' sx={{ display: index === 0 ? 'flex' : 'none'}}>United States of America</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 1 ? 'flex' : 'none'}}>United Kingdom</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 2 ? 'flex' : 'none'}}>Italy</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 3 ? 'flex' : 'none'}}>Switzerland and Liechtenstein</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 4 ? 'flex' : 'none'}}>Austria</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 5 ? 'flex' : 'none'}}>France</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 6 ? 'flex' : 'none'}}>Czech Republic</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 7 ? 'flex' : 'none'}}>Ireland</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 8 ? 'flex' : 'none'}}>Spain</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 9 ? 'flex' : 'none'}}>Denmark</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 10 ? 'flex' : 'none'}}>Sweden</Typography>
                            <Typography variant='h6' component='div' sx={{ display: index === 11 ? 'flex' : 'none'}}>Albania, Andorra, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Estonia, Finland, Germany, Greece, Hungary, Iceland, Israel, Latvia, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, Norway, Poland, Portugal, Northern Macedonia, Romania, San Marino, Serbia, Slovakia, Slovenia, Turkey, Ukraine; and Gibraltar, Guernsey, Jersey, Isle of Man, Faroe Islands, Greenland</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: index === 0 ? 'block' : 'none' }}>
                            <div>
                                <h4>Released: July 7, 2020</h4>
            
                                <p><strong>COVID19 data</strong></p>
                                
                                <p>Real-time COVID19 data comes from the COVID Tracking Project: <a target="_blank" href="https://covidtracking.com/api/">https://covidtracking.com/api/</a></p>
                                
                                <p>Real-time county level COVID19 data comes from the NYTimes COVID19 data project: <a target="_blank" href="https://github.com/nytimes/covid-19-data">https://github.com/nytimes/covid-19-data</a></p>
                                
                                <p><strong>Population data</strong></p>
                                
                                <p>US 2019 population estimate data comes from the US Census: <a target="_blank" href="https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html">https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html</a></p>
                                
                                <p><strong>Vaccination data</strong></p>
                                
                                <p>County-level vaccination coverage is collated by the Bansal lab at <a target="_blank" href="https://www.vaccinetracking.us/">https://www.vaccinetracking.us/</a>. We linearly interpolate between weekly values and merge county data to account for geographic exceptions in Alaska (Hoonah-Angoon plus Yakutat; Lake Peninsula plus Bristol Bay) and in New York City (New York, Kings, Queens, Bronx plus Richmond) following the New York Times dataset. Joint vaccination levels are computed for the City of Joplin, Jasper County, and Newton County, Missouri and for Kansas City, Jackson County, Clay County, Cass County, and Platte County, Missouri.</p>
                                
                                <p>Merritt, Alexes; Tiu, Andrew; Bansal, Shweta, 2021, “Integrated US COVID-19 Vaccination Data”, <a target="_blank" href="https://doi.org/10.7910/DVN/BFRIKI">https://doi.org/10.7910/DVN/BFRIKI</a>, Harvard Dataverse, V1.</p>
                                
                                <p>Andrew Tiu, Zachary Susswein, Alexes Merritt, Shweta Bansal. Characterizing the spatiotemporal heterogeneity of the COVID-19 vaccination landscape. medRxiv. <a target="_blank" href="https://doi.org/10.1101/2021.10.04.21263345">https://doi.org/10.1101/2021.10.04.21263345</a></p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 1 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 5, 2020</h4>
            
                                <p>The Coronavirus (COVID-19) in the UK API from Public Health England and NHSX: <a target="_blank" href="https://coronavirus.data.gov.uk">https://coronavirus.data.gov.uk</a></p>                               
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 2 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 5, 2020</h4>
                                
                                <p>Italian Department of Civil Protection COVID-19 Data: <a target="_blank" href="https://github.com/pcm-dpc/COVID-19/">https://github.com/pcm-dpc/COVID-19/</a></p>
                                
                                <p>Italian maps: <a target="_blank" href="http://datainterfaces.org/projects/covid19eventi/">http://datainterfaces.org/projects/covid19eventi/</a></p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 3 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 5, 2020</h4>
        
                                <p>(from October 5, 2020 - December 19, 2021) Specialist Unit for Open Government Data Canton of Zurich COVID-19 data: <a target="_blank" href="https://github.com/openZH/covid_19">https://github.com/openZH/covid_19</a></p>
                                <p>(from December 19, 2021):  Federal Office of Public Health FOPH: <a target="_blank" href="https://www.covid19.admin.ch/en/overview">https://www.covid19.admin.ch/en/overview</a></p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 4 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 19, 2020</h4>
        
                                <p>Federal Ministry for Social Affairs, Health, Care and Consumer Protection (BMSGPK) data on COVID-19 for Austria: <a target="_blank" href="https://www.data.gv.at/covid-19/">https://www.data.gv.at/covid-19/</a></p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 5 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 19, 2020</h4>   
                                <p>Santé publique France COVID-19 data for France :  <a target="_blank" href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/">https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/</a></p>
                                <p>Note this resource also contains data for overseas departments of France, and for Saint Barthélemy, Saint Martin, and Saint Pierre and Miquelon.</p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 6 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 27, 2020</h4>
        
                                <p>COVID-19 data sourced from National Health Information System, Regional Hygiene Stations, Ministry of Health of the Czech Republic and prepared by the Institute of Health Information and Statistics of the Czech Republic and the Institute of Biostatistics and Analyses, Faculty of Medicine, Masaryk University: <a target="_blank" href="https://onemocneni-aktualne.mzcr.cz/covid-19">https://onemocneni-aktualne.mzcr.cz/covid-19</a> </p>
        
                                <p>Komenda M., Karolyi M., Bulhart V., Žofka J., Brauner T., Hak J., Jarkovský J., Mužík J., Blaha M., Kubát J., Klimeš D., Langhammer P., Daňková Š ., Májek O., Bartůňková M., Dušek L. COVID 19: Overview of the current situation in the Czech Republic. Disease currently [online]. Prague: Ministry of Health of the Czech Republic, 2020. Available from: <a target="_blank" href="https://onemocneni-aktualne.mzcr.cz/covid-19">https://onemocneni-aktualne.mzcr.cz/covid-19</a> . Development: joint workplace of IHIS CR and IBA LF MU. ISSN 2694-9423.</p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 7 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 27, 2020</h4>
        
                                <p>Data is provided by the Health Service Executive (HSE), Health Protection Surveillance Centre (HPSC), The Central Statistics Office (CSO) and Gov.ie and accessed via Ireland's COVID-19 Data Hub: <a target="_blank" href="https://covid19ireland-geohive.hub.arcgis.com/">https://covid19ireland-geohive.hub.arcgis.com/</a></p>      
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 8 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: October 27, 2020</h4>
        
                                <p>COVID-19 data from España Ministerio de Sanidad and Instituto de Salud Carlos III: <a target="_blank" href="https://cnecovid.isciii.es/covid19/">https://cnecovid.isciii.es/covid19/</a> </p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 9 ? 'block' : 'none'}}>
                            <div sx={{width: 'auto'}}>
                                <h4>Released: November 22, 2020</h4>
        
                                <p>COVID-19 data from the Statens Serum Institut (SSI):</p>
                                
                                <ul>
                                <li><a target="_blank" href="https://covid19.ssi.dk/overvagningsdata">https://covid19.ssi.dk/overvagningsdata</a></li>
                                <li><a target="_blank" href="https://experience.arcgis.com/experience/aa41b29149f24e20a4007a0c4e13db1d">https://experience.arcgis.com/experience<br/>/aa41b29149f24e20a4007a0c4e13db1d</a></li>
                                </ul>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 10 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: November 22, 2020</h4>

                                <p sx={{width: 'auto'}}>Swedish COVID-19 National Statistics from Folkhälsomyndigheten: <a target="_blank" href="https://experience.arcgis.com/experience/09f821667ce64bf7be6f9f87457ed9aa/page/page_0/">https://experience.arcgis.com/experience/<br/>09f821667ce64bf7be6f9f87457ed9aa/page<br/>/page_0/</a></p>
                            </div>
                        </AccordionDetails>
                        <AccordionDetails sx={{ display: index === 11 ? 'block' : 'none'}}>
                            <div>
                                <h4>Released: December 19, 2021</h4>

                                <p sx={{width: 'auto'}}>We use data aggregated from local health resources in the WHO European Region COVID19 Subnational Explorer: <a target="_blank" href="https://experience.arcgis.com/experience/3a056fc8839d47969ef59949e9984a71">https://experience.arcgis.com/experience/<br/>3a056fc8839d47969ef59949e9984a71</a></p>                               
                            </div>
                        </AccordionDetails>
                        </StyledAccordion>
                    </Paper>
                ))}
            </Masonry>
        </Box>

        /* OLD PAGE LAYOUT BELOW */


        // <div className="data">

        // <h1>Data Sources</h1>

        // <h3>United States of America</h3>

        // <h4>Released: July 7, 2020</h4>
        
        // <p><strong>COVID19 data</strong></p>
        
        // <p>Real-time COVID19 data comes from the COVID Tracking Project: <a href="https://covidtracking.com/api/">https://covidtracking.com/api/</a></p>
        
        // <p>Real-time county level COVID19 data comes from the NYTimes COVID19 data project: <a href="https://github.com/nytimes/covid-19-data">https://github.com/nytimes/covid-19-data</a></p>
        
        // <p><strong>Population data</strong></p>
        
        // <p>US 2019 population estimate data comes from the US Census: <a href="https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html">https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html</a></p>
        
        // <p><strong>Vaccination data</strong></p>
        
        // <p>County-level vaccination coverage is collated by the Bansal lab at <a href="https://www.vaccinetracking.us/">https://www.vaccinetracking.us/</a>. We linearly interpolate between weekly values and merge county data to account for geographic exceptions in Alaska (Hoonah-Angoon plus Yakutat; Lake Peninsula plus Bristol Bay) and in New York City (New York, Kings, Queens, Bronx plus Richmond) following the New York Times dataset. Joint vaccination levels are computed for the City of Joplin, Jasper County, and Newton County, Missouri and for Kansas City, Jackson County, Clay County, Cass County, and Platte County, Missouri.</p>
        
        // <p>Merritt, Alexes; Tiu, Andrew; Bansal, Shweta, 2021, “Integrated US COVID-19 Vaccination Data”, <a href="https://doi.org/10.7910/DVN/BFRIKI">https://doi.org/10.7910/DVN/BFRIKI</a>, Harvard Dataverse, V1.</p>
        
        // <p>Andrew Tiu, Zachary Susswein, Alexes Merritt, Shweta Bansal. Characterizing the spatiotemporal heterogeneity of the COVID-19 vaccination landscape. medRxiv. <a href="https://doi.org/10.1101/2021.10.04.21263345">https://doi.org/10.1101/2021.10.04.21263345</a></p>
        
        // <h3>United Kingdom</h3>
        
        // <h4>Released: October 5, 2020</h4>
        
        // <p>The Coronavirus (COVID-19) in the UK API from Public Health England and NHSX: <a href="https://coronavirus.data.gov.uk">https://coronavirus.data.gov.uk</a></p>
        
        // <h3>Italy</h3>
        
        // <h4>Released: October 5, 2020</h4>
        
        // <p>Italian Department of Civil Protection COVID-19 Data: <a href="https://github.com/pcm-dpc/COVID-19/">https://github.com/pcm-dpc/COVID-19/</a></p>
        
        // <p>Italian maps: <a href="http://datainterfaces.org/projects/covid19eventi/">http://datainterfaces.org/projects/covid19eventi/</a></p>
        
        // <h3>Switzerland and Liechtenstein</h3>
        
        // <h4>Released: October 5, 2020</h4>
        
        // <p>(from October 5, 2020 - December 19, 2021) Specialist Unit for Open Government Data Canton of Zurich COVID-19 data: <a href="https://github.com/openZH/covid_19">https://github.com/openZH/covid_19</a></p>
        // <p>(from December 19, 2021):  Federal Office of Public Health FOPH: <a href="https://www.covid19.admin.ch/en/overview">https://www.covid19.admin.ch/en/overview</a></p>
        
        // <h3>Austria</h3>
        
        // <h4>Released: October 19, 2020</h4>
        
        // <p>Federal Ministry for Social Affairs, Health, Care and Consumer Protection (BMSGPK) data on COVID-19 for Austria: <a href="https://www.data.gv.at/covid-19/">https://www.data.gv.at/covid-19/</a></p>
        
        // <h3>France</h3>
        
        // <h4>Released: October 19, 2020</h4>
        
        // <p>Santé publique France COVID-19 data for France :  <a href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/">https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/</a></p>
        // <p>Note this resource also contains data for overseas departments of France, and for Saint Barthélemy, Saint Martin, and Saint Pierre and Miquelon.</p>
        
        // <h3>Czech Republic</h3>
        
        // <h4>Released: October 27, 2020</h4>
        
        // <p>COVID-19 data sourced from National Health Information System, Regional Hygiene Stations, Ministry of Health of the Czech Republic and prepared by the Institute of Health Information and Statistics of the Czech Republic and the Institute of Biostatistics and Analyses, Faculty of Medicine, Masaryk University: <a href="https://onemocneni-aktualne.mzcr.cz/covid-19">https://onemocneni-aktualne.mzcr.cz/covid-19</a> </p>
        
        // <p>Komenda M., Karolyi M., Bulhart V., Žofka J., Brauner T., Hak J., Jarkovský J., Mužík J., Blaha M., Kubát J., Klimeš D., Langhammer P., Daňková Š ., Májek O., Bartůňková M., Dušek L. COVID 19: Overview of the current situation in the Czech Republic. Disease currently [online]. Prague: Ministry of Health of the Czech Republic, 2020. Available from: <a href="https://onemocneni-aktualne.mzcr.cz/covid-19">https://onemocneni-aktualne.mzcr.cz/covid-19</a> . Development: joint workplace of IHIS CR and IBA LF MU. ISSN 2694-9423.</p>
        
        // <h3>Ireland</h3>
        
        // <h4>Released: October 27, 2020</h4>
        
        // <p>Data is provided by the Health Service Executive (HSE), Health Protection Surveillance Centre (HPSC), The Central Statistics Office (CSO) and Gov.ie and accessed via Ireland's COVID-19 Data Hub: <a href="https://covid19ireland-geohive.hub.arcgis.com/">https://covid19ireland-geohive.hub.arcgis.com/</a></p>
        
        // <h3>Spain</h3>
        
        // <h4>Released: October 27, 2020</h4>
        
        // <p>COVID-19 data from España Ministerio de Sanidad and Instituto de Salud Carlos III: <a href="https://cnecovid.isciii.es/covid19/">https://cnecovid.isciii.es/covid19/</a> </p>
        
        // <h3>Denmark</h3>
        
        // <h4>Released: November 22, 2020</h4>
        
        // <p>COVID-19 data from the Statens Serum Institut (SSI):</p>
        
        // <ul>
        // <li><a href="https://covid19.ssi.dk/overvagningsdata">https://covid19.ssi.dk/overvagningsdata</a></li>
        // <li><a href="https://experience.arcgis.com/experience/aa41b29149f24e20a4007a0c4e13db1d">https://experience.arcgis.com/experience/aa41b29149f24e20a4007a0c4e13db1d</a></li>
        // </ul>
        
        // <h3>Sweden</h3>
        
        // <h4>Released: November 22, 2020</h4>
        
        // <p>Swedish COVID-19 National Statistics from Folkhälsomyndigheten: <a href="https://experience.arcgis.com/experience/09f821667ce64bf7be6f9f87457ed9aa/page/page_0/">https://experience.arcgis.com/experience/09f821667ce64bf7be6f9f87457ed9aa/page/page_0/</a></p>
        
        // <h3>Albania, Andorra, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Estonia, Finland, Germany, Greece, Hungary, Iceland, Israel, Latvia, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, Norway, Poland, Portugal, Northern Macedonia, Romania, San Marino, Serbia, Slovakia, Slovenia, Turkey, Ukraine; and Gibraltar, Guernsey, Jersey, Isle of Man, Faroe Islands, Greenland</h3>
        
        // <h4>Released: December 19, 2021</h4>
        
        // <p>We use data aggregated from local health resources in the WHO European Region COVID19 Subnational Explorer: <a href="https://experience.arcgis.com/experience/3a056fc8839d47969ef59949e9984a71">https://experience.arcgis.com/experience/3a056fc8839d47969ef59949e9984a71</a></p>
        // </div>
    );
}
