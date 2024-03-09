import { useEffect, useState } from "react";

// Debounce input value by delaying update until no changes occur to it
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // setTimeout whenever input value changes
    const timeout = setTimeout(() => {
      // Update debounced value to current input value after delay
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear previous timeout in case value changes before timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
