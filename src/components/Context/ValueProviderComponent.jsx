import React, { useState } from 'react';
import { MyContext } from './Context';

const ValueProviderComponent = ({ children }) => {
  const [value, setValue] = useState("light");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children} 
    </MyContext.Provider>
  );
};

export default ValueProviderComponent;
