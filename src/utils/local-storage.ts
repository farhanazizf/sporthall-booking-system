import { useState, useCallback } from "react";
// import { Severity } from '@sentry/react';
// import logException from './log-exception';

type SetValue<T> = T | ((val: T) => T);
export type UseLocalStorage<T> = [
  T,
  (newValue: SetValue<T>) => void,
  () => void
];

export const getStorageValue = <T>(key: string, initialValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // logException({
    //   error,
    //   level: Severity.Error,
    //   fingerprint: ['use-storage', 'get-item']
    // });

    return initialValue;
  }
};

export const setStorageValue = <T>(
  key: string,
  newValue: SetValue<T>,
  initialValue: T
): T => {
  try {
    const valueToStore =
      newValue instanceof Function ? newValue(initialValue) : newValue;

    window.localStorage.setItem(key, JSON.stringify(valueToStore));

    return valueToStore;
  } catch (error) {
    // logException({
    //   error,
    //   level: Severity.Error,
    //   fingerprint: ['use-storage', 'set-item']
    // });

    return initialValue;
  }
};

export const removeStorageValue = (key: string): void => {
  window.localStorage.removeItem(key);
};

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorage<T> {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStorageValue<T>(key, initialValue)
  );

  const setValue = useCallback(
    (newValue: SetValue<T>) => {
      const updateValue = setStorageValue<T>(key, newValue, storedValue);
      setStoredValue(updateValue);
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    removeStorageValue(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
