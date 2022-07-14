import * as React from 'react';
import Onboarding from '../components/onboarding.js';
import OnboardingSteps from '../components/onboardingSteps.js';
import { render, screen } from '@testing-library/react';
import Dialog from '@mui/material/Dialog';

const handleTutorialStep1 = () => {
    const locationAnchorEl = null; 
    const locationPopperOpen = true;
}

test('Onboarding renders without crashing', () => {
    const handleClose = jest.fn();
  
    render(
      <Onboarding handleTutorialStep1={handleTutorialStep1}>
          <Dialog open={true} keepMounted onClose={handleClose}>
          </Dialog>
      </Onboarding>,
    );

    expect(screen.getByText('Welcome to the COVID-19 Probability Estimator for Exposure Risk (PEER)!')).toBeVisible();
})

test('Onboarding step 1 renders without crashing', () => {
    render(<OnboardingSteps step1={true}></OnboardingSteps>);

    expect(screen.getByText('Locate your area')).toBeVisible();
})

test('Onboarding step 2 renders without crashing', () => {
    render(<OnboardingSteps step2={true}></OnboardingSteps>);

    expect(screen.getByText('Choose crowd size')).toBeVisible();
})

test('Onboarding step 3 renders without crashing', () => {
    render(<OnboardingSteps step3={true}></OnboardingSteps>);

    expect(screen.getByText('Map controls')).toBeVisible();
})
