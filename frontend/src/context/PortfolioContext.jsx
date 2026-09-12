import { createContext, useState } from "react";

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {

    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);

    return (
        <PortfolioContext.Provider
            value={{
                projects,
                setProjects,
                categories,
                setCategories
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
}