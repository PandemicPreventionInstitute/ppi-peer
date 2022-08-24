import ReactGA from "react-ga";

export const GAtimingTracker = (categoryName, variableName, valueNum) => {
    ReactGA.initialize('G-8YZYM2GQGD', 
    { 
      debug: false,  
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });

    ReactGA.timing({       
        category: categoryName,       
        variable: variableName,       
        value: valueNum
    });
}

export const GAregionSelect = (value) => {
  window.gtag('event', 'region_select', {
    'page_name': 'Map Page',
    'click_name': 'region_dropdown_selector_event',
    'region_dropdown_selected': value
  });
}

export const GAmapClick = (value) => {
  window.gtag('event', 'map_click', {
    'page_name': 'Map Page',
    'click_name': 'map_click_event',
    'region_map_clicked': value
  });
}

export const GAcrowdSizeSelect = (value) => {
  window.gtag('event', 'crowd_size_select', {
    'page_name': 'Map Page',
    'click_name': 'crowd_size_select',
    'crowd_size_selected': value
  });
}

export const GAeventTracker = (categoryValue, labelValue) => {
  window.gtag('event', 'click', {
    'page_name': categoryValue,
    'click_name': labelValue
  });
}

export const GAonboardingEventTracker = (categoryValue, labelValue) => {
  window.gtag('event', 'onboarding_click', {
    'page_name': categoryValue,
    'click_name': labelValue
  });
}

export const GAaboutEventTracker = (categoryValue, labelValue) => {
  window.gtag('event', 'about_click', {
    'page_name': categoryValue,
    'click_name': labelValue
  });
}
