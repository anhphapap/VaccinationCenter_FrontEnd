import React, { createContext, useState, useContext } from "react";
import { showToast } from "../components/common/ShowToast";
// import { VaccineContext } from "./VaccineContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //   const { selectedVaccines } = useContext(VaccineContext);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (vaccine) => {
    setCartItems((prevItems) => {
      if (isVaccineInCart(vaccine.id)) {
        return prevItems;
      }
      showToast({
        type: "success",
        text1: "Đã thêm vắc xin vào giỏ hàng",
      });
      return [...prevItems, vaccine];
    });
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
