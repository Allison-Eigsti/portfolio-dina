import { createContext, useEffect, useState } from "react"
import { getProjects, getCategories } from '../services/api'

export const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
const [projects, setProjects] = useState([])
const [categories, setCategories] = useState([])

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects()
        const categoriesData = await getCategories()

        setProjects(projectsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error(error)
      }
    };

    fetchData();
  }, [])

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
  )
}