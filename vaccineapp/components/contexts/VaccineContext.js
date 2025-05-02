import React, { createContext, useState } from "react";

export const VaccineContext = createContext();

export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  const addVaccine = (product) => {
    setSelectedVaccines((prev) => [...prev, product]);
  };

  const removeVaccine = (id) => {
    setSelectedVaccines((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <VaccineContext.Provider
      value={{ selectedVaccines, addVaccine, removeVaccine }}
    >
      {children}
    </VaccineContext.Provider>
  );
};
