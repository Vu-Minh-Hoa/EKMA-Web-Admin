import debounce from 'lodash/debounce';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useCallback } from "react";

export const useDebounce = (callback: Function, delay = 300) => {
  const debouncedFunction = useCallback(
    debounce((...args: any[]) => {
      callback(...args);
    }, delay),
    [callback, delay]
  );

  return debouncedFunction;
}