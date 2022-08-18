import ReactGA from "react-ga";

export const GAtimingTracker = (categoryName, variableName, valueNum) => {
    ReactGA.timing({       
        category: categoryName,       
        variable: variableName,       
        value: valueNum
    });
};

export const GAsetRegionDropdown = (value) => {
  // ReactGA.set({ dimension1: value });
  // GAeventTracker('Map Events', 'region_dropdown_selector_event'); // track region select event in Google Analytics

  window.gtag('event', 'click', {
    page_name: 'Map Page',
    click_name: 'region_dropdown_selector_event',
    region_dropdown_selected: value
  });
}

export const GAsetRegionMap = (value) => {
  // ReactGA.set({ dimension2: value });
  // GAeventTracker('Map Events', 'map_click_event'); // track map click in Google Analytics

  window.gtag('event', 'click', {
    page_name: 'Map Page',
    click_name: 'map_click_event',
    region_map_clicked: value
  });
}

export const GAeventTracker = (categoryValue, labelValue) => {
  // ReactGA.event({
  //   category: categoryValue,
  //   action: actionValue,
  //   label: labelValue
  // });

  window.gtag('event', 'click', {
    page_name: categoryValue,
    click_name: labelValue
  });
}
