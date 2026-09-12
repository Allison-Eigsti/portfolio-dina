import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export function useProjects() {
    return useContext(PortfolioContext);
}