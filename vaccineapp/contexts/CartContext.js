import React, { createContext, useState, useContext } from "react";
// import { VaccineContext } from "./VaccineContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //   const { selectedVaccines } = useContext(VaccineContext);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (vaccine) => {
    setCartItems((prevItems) => [...prevItems, vaccine]);
  };

  const removeFromCart = (vaccineId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== vaccineId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isVaccineInCart = (vaccineId) => {
    return cartItems.some((item) => item.id === vaccineId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isVaccineInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
