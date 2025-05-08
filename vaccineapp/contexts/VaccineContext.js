import React, { createContext, useState } from "react";

export const VaccineContext = createContext();

export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  const addVaccine = (product) => {
    setSelectedVaccines([...product]);
  };

  const removeVaccine = (id) => {
    setSelectedVaccines((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <VaccineContext.Provider
      value={{
        selectedVaccines,
        addVaccine,
        removeVaccine,
        setSelectedVaccines,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
};
