import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue, setIsAccessible) => {
  const [value, setValue] = useState(() => {
    try {
      return getStorageValue(key, defaultValue);
    } catch(err) {
      setIsAccessible(false); // set the isAccessible state to false so we can hide the checkbox option on the UI
      console.log('local storage is inaccessible, cannot get storage value');
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      // storing input name
      localStorage.setItem(key, JSON.stringify(value));
    } catch(err) {
      setIsAccessible(false);
      console.log('cannot store input name, local storage is inaccessible');
    }
  }, [key, value]);

  return [value, setValue];
};
