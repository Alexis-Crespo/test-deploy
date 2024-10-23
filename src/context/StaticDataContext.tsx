import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface StaticDataItem {
  type: string;
  data: Record<string, string>;
}

interface StaticDataContextType {
  staticData: StaticDataItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const StaticDataContext = createContext<StaticDataContextType | undefined>(
  undefined
);

// Hook para acceder al contexto
export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  if (!context) {
    throw new Error(
      "useStaticData debe ser usado dentro de StaticDataProvider"
    );
  }
  return context;
};

// Proveedor del contexto
export const StaticDataProvider = ({ children }: { children: ReactNode }) => {
  const [staticData, setStaticData] = useState<StaticDataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaticData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`/api/static-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStaticData(response.data);
      } catch (error) {
        setError("Error al cargar los datos estáticos");
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={{ staticData, isLoading, error }}>
      {children}
    </StaticDataContext.Provider>
  );
};
