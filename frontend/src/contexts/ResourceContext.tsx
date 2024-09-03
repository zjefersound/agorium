import { createContext, useEffect, useMemo } from "react";
import { useCategories } from "../hooks/resources/useCategories";
import { useAuth } from "../hooks/useAuth";

interface ResourceProviderProps {
  children: React.ReactNode;
}

export interface ResourceContextType {}

export const ResourceContext = createContext<ResourceContextType>(
  {} as ResourceContextType,
);

export const ResourceProvider = ({ children }: ResourceProviderProps) => {
  const { authenticated } = useAuth();
  const categoriesResource = useCategories();
  const values = useMemo(() => ({ categoriesResource }), [categoriesResource]);

  useEffect(() => {
    if (!authenticated) return;
    categoriesResource.fetchCategories();
  }, [authenticated]);
  return (
    <ResourceContext.Provider value={values}>
      {children}
    </ResourceContext.Provider>
  );
};
