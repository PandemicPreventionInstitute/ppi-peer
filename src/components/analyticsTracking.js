import ReactGA from "react-ga";

export const GAtimingTracker = (categoryName, variableName, valueNum) => {
    ReactGA.timing({       
        category: categoryName,       
        variable: variableName,       
        value: valueNum
    });
};

export const GApageView = (page) => {   
  ReactGA.pageview(page);   
}

export const GAsetRegionDropdownDimension = (value) => {
  ReactGA.set({ region_dropdown_selector: value });
}

export const GAsetRegionMapDimension = (value) => {
  ReactGA.set({ region_map_click: value });
}

const GAeventTracker = (category="PEER category") => {
  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default GAeventTracker;
