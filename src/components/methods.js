import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

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

    return ( 
        <MathJaxContext version={3} config={config}>
            <div className="data">

            <h1>How PEER works</h1>

            <p>PEER, or Probability Estimator for Exposure Risk, provides estimates of the probability that one or more individuals infected with 
                COVID-19 will be present at an event. It <u>does not</u> estimate the probability that an infected individual would go on to transmit at 
                the event and infect someone, as this depends on several event-specific factors such as mask-use, ventilation, crowding, and 
                immunity of attendees. Here we describe briefly how we estimate the probability that an individual infected with COVID-19 will be 
                present at an event, using reported COVID-19 cases from that region. These methods were established by our collaborators in <a href='https://weitzgroup.biosci.gatech.edu/'>
                The Weitz Group</a> and <a href='https://planning.gatech.edu/people/clio-andris'>Andris Group</a> at Georgia Tech, as described in 
                their <a href='https://www.nature.com/articles/s41562-020-01000-9'>peer-reviewed publication</a>, and accompanying <a 
                href='https://blogs.scientificamerican.com/observations/online-covid-19-dashboard-calculates-how-risky-reopenings-and-gatherings-can-be/'>Op-Ed</a>. 
                Georgia Tech has also published a software note describing the <a href='https://github.com/PandemicPreventionInstitute/subregionalcovid19'>R package</a>. 
                Similar methodology has also been applied by the <a href='https://covid-19.tacc.utexas.edu/'>Meyers Lab at UT Austin</a> to estimate 
                the <a href='https://covid-19.tacc.utexas.edu/dashboards/school-risk/'>expected introductions in schools</a> and assess the <a 
                href='chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://covid-19.tacc.utexas.edu/media/filer_public/5e/e4/5ee435ec-fe51-4b4f-99e4-88c3c24eb386/final_event_risk_framework_may_2022.pdf'>risk posed by large events.</a> 
            </p>

            <h3>Probability that one or more people arrive infected to an event of size <i>n</i></h3>

            <p>Calculating the probability that one or more people will show up to an event infected is an extension of a foundational question in 
                probability. The easiest way to solve this is to invert the question and start by finding the probability that no one in the group 
                of size <i>n</i> arrives infected. We first use the following equation to find the probability that an individual is not infected, where 
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

            <h3>Expected number of event attendees arriving infected</h3>

            <p>In addition to providing the risk that at least 1 person will arrive infected to an event of size <i>n</i>, we also provide an estimate of 
                the range of expected event attendees that will arrive infected, as this number can be helpful for planning of resource allocation 
                (i.e. isolation rooms, testing, treatments etc.) needed to respond to outbreaks. The expected number of individuals arriving 
                infected is simply:</p>

            <p><MathJax>{'$$ N_{infected} = n \\times prev_k $$'}</MathJax></p>

            <p>Where <i>N</i> is the number of individuals attending the event and <MathJax inline >{'$prev_k$'}</MathJax> is the estimated prevalence of disease among the population. 
                We report the <MathJax inline >{'$N_{infected}$'}</MathJax> over <i>k</i> prevalence estimates (lower bound, median, and upper bound) reflecting the uncertainty in the 
                fraction of cases reported. For ease of interpretation, we round numbers to the nearest integer. If <MathJax inline >{'$N_{infected}$'}</MathJax> is estimated to be 
                less than 1, we report “0 to 1” event attendees would be expected to arrive infected. </p>

            <h3>Estimating disease prevalence</h3>

            <p>Estimating the disease prevalence among the population of interest, however, is non-trivial. A myriad of factors can affect the expected 
                disease prevalence among event attendees such as vaccination status and prior immunity, as well as pre-event mitigation measures such as 
                asking individuals to stay home if sick or take a COVID-19 test before arriving at an event. In the current version of PEER, we do not 
                explicitly account for any of these factors that may raise or lower the disease prevalence among attendees. Instead, this tool assumes 
                that event attendees are sampled randomly from the region of interest (i.e. a country, state, or municipality, depending on the geographic 
                granularity of the regional data available). In reality, event attendees aren’t a random sample from the population and may be systematically 
                at higher or lower risk of arriving infected due to a number of factors we don’t consider here (i.e. age, occupation, etc.). This could make 
                events higher or lower risk than our estimates imply.</p>

            <p>And, in practice, only data on newly reported COVID-19 cases (i.e. incidence) is available, not data on the total number of current infections
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

            <p><MathJax>{'$$ prev_k = C_a \\frac{1}{f_d} = C_a \\times AB_k$$'}</MathJax></p>

            <p>We sometimes refer to <MathJax inline >{'$f_d$'}</MathJax> as the underreporting rate and <i>AB</i>{/* <MathJax inline>{'$ \\frac{1}{f_d} $'}</MathJax> */} 
                is the ascertainment bias, and <i>k</i> is the <i>k</i>th value of the ascertainment bias. For the probabilistic risk estimate, we use the central value 
                of ascertainment bias of 8. For the range of expected infected attendees, we use a lower bound of 4 and an upper bound of 15. In reality, the fraction 
                of infections that are detected and reported as cases is highly variable across time and space, and reflects a combination of public health policies, resource 
                availability, and reporting infrastructure. Estimating the fraction of all infections that get reported as cases is a non-trivial problem 
                as testing levels and reporting mechanisms vary significantly across geographies and shift in time. Future versions of the tool aim to account for the 
                dynamic and geographically variable nature of this quantity.</p>

            <h3>The Data</h3>

            <p>PEER currently includes a risk estimate and associated metrics for a subset of countries who publicly 
                report case data at the subnational level in a downloadable format. An <a href='https://github.com/sjbeckett/subregionalcovid19'>
                R package</a> has been developed by our collaborators at Georgia Tech that makes the subnational level data used to populate 
                this risk map available for the current time point.</p>

            <p>Among the countries in this dataset, reporting practices are likely to be highly variable and dependent on testing 
                availability and data reporting systems. At this time, we do not make a country or region-specific estimate of the 
                underreporting rate. However, our Surveillance Capacity tool characterizes countries' diagnostic capacities based on 
                reported test positivity rate and tests per capita. We developed data-driven testing targets based on the distributions 
                of these metrics across lower and middle income countries, as is described <a 
                href='https://github.com/PandemicPreventionInstitute/NGS-Capacity-map/blob/main/methods/ngs_methods_2022.pdf'>here</a>. 
                A country is characterized as not meeting testing targets if, in the past year if their: </p>

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