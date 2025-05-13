import React, { createContext, useState } from "react";

export const VaccineContext = createContext();

export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  const addVaccine = (product) => {
    setSelectedVaccines((prev) => {
      const updatedVaccines = prev.filter(
        (vaccine) => !product.some((p) => p.id === vaccine.id)
      );
      return [...updatedVaccines, ...product];
    });
  };

  const removeVaccine = (id) => {
    setSelectedVaccines((prev) => prev.filter((p) => p.id !== id));
  };

  const isSelectedVaccine = (id) => {
    return selectedVaccines.some((p) => p.id === id);
  };

  return (
    <VaccineContext.Provider
      value={{
        selectedVaccines,
        addVaccine,
        removeVaccine,
        setSelectedVaccines,
        isSelectedVaccine,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
};
