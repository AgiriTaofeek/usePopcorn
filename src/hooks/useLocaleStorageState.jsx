import { useEffect, useState } from "react";

const useLocaleStorageState = (initialState, key) => {
  const [value, setValue] = useState(
    // Return the 1st truthy value from left to right and if both are falsy, return last falsy. if JSON.parse() exits, it returns it's data otherwise the next truthy is empty array initialState
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};

export default useLocaleStorageState;
