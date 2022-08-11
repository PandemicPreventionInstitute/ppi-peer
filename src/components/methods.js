import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import ReactGA from "react-ga";

const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    startup: {
      typeset: false
    }
  };

export default function Methods() {

    ReactGA.pageview(window.location.pathname + window.location.search);

    return ( 
        <MathJaxContext version={3} config={config}>
            <div className="data">

            <h1>How PEER works</h1>

            <p>PEER, or Probability Estimator for Exposure Risk, provides estimates of the probability that one or more individuals infected with 
                COVID-19 will be present at an event. It <u>does not</u> estimate the probability that an infected individual would go on to transmit at 
                the event and infect someone, as this depends on several event-specific factors such as mask-use, ventilation, crowding, and 
                immunity of attendees. Here we describe briefly how we estimate the probability that an individual infected with COVID-19 will be 
                present at an event, using reported COVID-19 cases from that region. These methods were established by our collaborators in <a href='https://weitzgroup.biosci.gatech.edu/'>
                The Weitz Group</a> at Georgia Tech, please see their <a href='https://www.nature.com/articles/s41562-020-01000-9'>peer-reviewed 
                publication</a> for further details, or check out our <a href='https://github.com/PandemicPreventionInstitute/subregionalcovid19'>github repository</a>.
            </p>

            <h3>The Theory: Probability that one or more people arrive infected to an event of size <i>n</i></h3>

            <p>Calculating the probability that one or more people will show up to an event infected is an extension of a foundational question in 
                probability. The easiest way to solve this is to invert the question and start by finding the probability that no one in the group 
                of size narrives infected. We first use the following equation to find the probability that an individual is not infected, where 
                our baseline assumption is that an individual’s risk of infection is equal to the region-level disease prevalence, <i>prev</i>.
            </p>

            <p><MathJax>{'$$ p(not\\ infected) = 1-prev $$'}</MathJax></p>

            <p>For a group of <i>n</i> people, we assume that the probability of infection for each individual in the group is independent. That means the 
                probability that no one in the group is infected is equal to the product of each individual’s probability of not being infected, so 
                we can write this as:</p>

            <p><MathJax>{'$$ p(no\\ one\\ infected\\ in\\ group\\ of\\ size\\ n) = (1-prev)^n $$'}</MathJax></p>

            <p>The probability that one or more individuals will be infected at the event is the inverse of the probability that no one is infected:</p>

            <p><MathJax>{'$$ p(\\geq 1\\ infected) = 1-(1-prev)^n $$'}</MathJax></p>

            <p>From this simple equation, we can easily estimate the probability that 1 or more infected individuals will arrive at an event of any 
                size, assuming we can approximate the disease prevalence among the event participants.</p>

            <h3>The Practice: Estimating disease prevalence</h3>

            <p>Estimating the disease prevalence among the population of interest, however, is non-trivial. A myriad of factors can affect the expected 
                disease prevalence among event attendees such as vaccination status and prior immunity, as well as pre-event mitigation measures such as 
                asking individuals to stay home if sick or take a COVID-19 test before arriving at an event. In the current version of PEER, we do not 
                explicitly account for any of these factors that may raise or lower the disease prevalence among attendees. Instead, this tool assumes 
                that event attendees are sampled randomly from the region of interest (i.e. a country, state, or municipality, depending on the geographic 
                granularity of the regional data available). In reality, event attendees aren’t a random sample from the population and may be systematically 
                at higher or lower risk of arriving infected due to a number of factors we don’t consider here (i.e. age, occupation, etc.). This could make 
                events higher or lower risk than our estimates imply.</p>

            <p>And, in practice, only data on newly reported COVID-19 cases (i.e. incidence) is available, not data on the total number of active infections
                (i.e. prevalence). To estimate prevalence from reported cases in a region, we must account for the duration of infections and the proportion of infections reported. If we assume 
                the individuals are infectious for an average of <i>d</i> days, we can approximate the active cases per capita by averaging over the cases 
                reported over the recent time window 𝛕, where the time window is small enough that we think it is a reasonable reflection of the 
                current prevalence, and large enough to smooth over weekday effects and reporting anomalies. Thus, we have the following equation, 
                where <MathJax inline >{'$C_a$'}</MathJax> is the active cases per capita, <MathJax inline >{'$c_i$'}</MathJax> is the number of reported cases on day <i>i</i> in 
                that region, <i>d</i> is the duration of infectiousness, 𝛕 is the time window we average over, and <i>pop</i> is the number of individuals 
                living in that region.</p>

            <p><MathJax>{'$$ C_a = d  \\cdot  \\frac{\\sum_{i=1}^{\\tau} c_i}{\\tau \\cdot pop} $$'}</MathJax></p>

            <p>In the current COVID-19 estimator, we use a time window 𝛕 of 14 days and assume duration of infectiousness, <i>d</i>, of 10 days. Of note, 
                this approximation will lead to an underestimate of active cases during times of growth in cases, and an overestimate during times 
                of declining cases.
            </p>

            <p>Once we have the number of active cases per capita, <MathJax inline >{'$C_a$'}</MathJax>, in a region, we approximate the disease prevalence by assuming that the 
                reported cases represent a fraction of the true number of infected individuals in the population. Thus we have the following 
                equation, where <i>prev</i> is the estimated disease prevalence, <MathJax inline >{'$C_a$'}</MathJax> is the estimated active cases per capita, and <MathJax inline >{'$f_d$'}</MathJax> is the fraction of infections that 
                are detected and reported:</p>

            <p><MathJax>{'$$ prev = C_a \\frac{1}{f_d} $$'}</MathJax></p>

            <p>We sometimes refer to <MathJax inline >{'$f_d$'}</MathJax> as the underreporting rate and <MathJax inline>{'$ \\frac{1}{f_d} $'}</MathJax> as the ascertainment bias. The fraction of infections that are detected 
                and reported as cases is highly variable across time and space, and reflects a combination of public health policies, resource 
                availability, and reporting infrastructure. In this initial version of PEER, we assume that all regions have the same <MathJax inline >{'$f_d$'}</MathJax> of ¼, 
                i.e. we assume an ascertainment bias of 4 for every country and region. However, future versions of the tool aim to account for the 
                dynamic and geographically variable nature of this quantity.</p>

            <h3>The Data</h3>

            <p>PEER currently includes a risk estimate and associated metrics for a subset of countries who publicly 
                report case data at the subnational level in a downloadable format. An R package has been developed by our 
                collaborators at Georgia Tech that makes the subnational level data used to populate this risk map available for the 
                current time point.</p>

            <p>Among the countries in this dataset, reporting practices are likely to be highly variable and dependent on testing 
                availability and data reporting systems. At this time, we do not make a country or region-specific estimate of the 
                underreporting rate. However, our Surveillance Capacity tool characterizes countries diagnostic capacities based on 
                reported test positivity rate and tests per capita. We developed data-driven testing targets based on the distributions 
                of these metrics across lower and middle income countries, as is described here. A country is characterized as not 
                meeting testing targets if, in the past year if their: </p>

            <ol>
                <li>Test positivity rate &gt; 20%</li>
                <p>OR</p>
                <li>Average daily tests per 1,000  &lt; 0.5 </li>
            </ol>

            <p>Although all countries face issues with reporting a sufficient proportion of cases, countries who are not meeting these 
                testing targets are particularly prone to these issues and are labeled with a warning message. We encourage users to 
                consider that risk levels in these countries in particular are likely higher than described here.</p>

            </div> 
        </MathJaxContext>
        
    );
}