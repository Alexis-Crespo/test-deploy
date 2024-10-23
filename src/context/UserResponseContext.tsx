import { createContext, useContext, useState, ReactNode } from "react";

const UserResponseContext = createContext<any>(null);

export const UserResponseProvider = ({ children }: { children: ReactNode }) => {
  const [responses, setResponses] = useState({
    isSujetoObligado: null,
    isNoResidente: null,
  });

  return (
    <UserResponseContext.Provider value={{ responses, setResponses }}>
      {children}
    </UserResponseContext.Provider>
  );
};

export const useUserResponse = () => useContext(UserResponseContext);
