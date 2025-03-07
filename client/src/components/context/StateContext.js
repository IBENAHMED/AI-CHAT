"use client"

import {createContext, useContext, useState} from 'react'

const StateContext = createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

export const StateProvider = ({children}) => {
  const [value, setValue] = useState('')

  return (
    <StateContext.Provider value={{value, setValue}}>
      {children}
    </StateContext.Provider>
  );
};
