import React, { useState, useEffect } from "react";

const useDebounce = (inputedValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputedValue);

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      setDebouncedValue(inputedValue);
    }, delay);

    return () => {
      clearTimeout(timeHandler);
    };
  }, [inputedValue]);

  return debouncedValue;
};

export default useDebounce;
