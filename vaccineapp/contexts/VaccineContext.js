import React, { createContext, useState } from "react";

export const VaccineContext = createContext();

export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [ignore, setIgnore] = useState(false);

  const addVaccine = (product) => {
    setSelectedVaccines([...product]);
    setIgnore(false);
  };

  const initVaccine = (product) => {
    setSelectedVaccines([...product]);
    setIgnore(true);
  };

  const removeVaccine = (id) => {
    setSelectedVaccines((prev) => prev.filter((p) => p.id !== id));
    setIgnore(false);
  };

  return (
    <VaccineContext.Provider
      value={{
        selectedVaccines,
        addVaccine,
        removeVaccine,
        setSelectedVaccines,
        ignore,
        initVaccine,
        setIgnore,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
};
