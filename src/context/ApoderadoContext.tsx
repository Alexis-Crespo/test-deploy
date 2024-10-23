import React, { createContext, useState, useContext, ReactNode } from "react";

type AppContextType = {
  foto: boolean;
  renaper: boolean;
  setFoto: (value: boolean) => void;
  setRenaper: (value: boolean) => void;
};

// Crear el contexto
const ApoderadoContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [foto, setFoto] = useState(false);
  const [renaper, setRenaper] = useState(false);

  return (
    <ApoderadoContext.Provider value={{ foto, renaper, setFoto, setRenaper }}>
      {children}
    </ApoderadoContext.Provider>
  );
};

export const useApoderadoContext = () => {
  const context = useContext(ApoderadoContext);
  if (!context) {
    throw new Error("useApoderadoContext must be used within an AppProvider");
  }
  return context;
};
