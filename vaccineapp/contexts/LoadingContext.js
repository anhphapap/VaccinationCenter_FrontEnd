import React, { createContext, useContext, useState } from "react";
import LoadingOverlay from "../components/common/LoadingOverlay";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Đang tải...");

  const showLoading = (msg = "Đang tải...") => {
    setMessage(msg);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <LoadingOverlay visible={loading} title={message} />
    </LoadingContext.Provider>
  );
};
