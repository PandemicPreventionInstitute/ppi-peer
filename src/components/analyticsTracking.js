import ReactGA from "react-ga";

export const GAtimingTracker = (categoryName, variableName, valueNum) => {
    ReactGA.timing({       
        category: categoryName,       
        variable: variableName,       
        value: valueNum
    });
};

export const GAsetRegionDropdownDimension = (value) => {
  ReactGA.set({ region_dropdown_selector: value });
}

export const GAsetRegionMapDimension = (value) => {
  ReactGA.set({ region_map_click: value });
}

export const GAeventTracker = (categoryValue, actionValue, labelValue) => {
  ReactGA.event({
    category: categoryValue,
    action: actionValue,
    label: labelValue
  });
}
