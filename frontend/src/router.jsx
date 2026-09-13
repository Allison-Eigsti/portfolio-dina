import { createBrowserRouter } from 'react-router-dom'
import { lazy } from "react"

import App from './App.jsx'

import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"
import ErrorPage from "./pages/ErrorPage"

// Public pages
const Home = lazy(() => import("./pages/public/Home"));
const Category = lazy(() => import("./pages/public/Category"));
const Project = lazy(() => import("./pages/public/Project"));

// Admin pages
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Projects = lazy(() => import("./pages/admin/Projects"));
const NewProject = lazy(() => import("./pages/admin/NewProject"));
const EditProject = lazy(() => import("./pages/admin/EditProject"));
const Categories = lazy(() => import("./pages/admin/Category.jsx"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory.jsx"));
const EditCategory = lazy(() => import("./pages/admin/EditCategory"));

// 404
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

      // PUBLIC
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "category/:slug",
            element: <Category />
          },
          {
            path: "project/:slug",
            element: <Project />
          }
        ]
      },

      // ADMIN
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "projects",
            children: [
              {
                index: true,
                element: <Projects />
              },
              {
                path: "new",
                element: <NewProject />
              },
              {
                path: ":id/edit",
                element: <EditProject />
              }
            ]
          },
          {
            path: "categories",
            children: [
              {
                index: true,
                element: <Categories />
              },
              {
                path: "create",
                element: <CreateCategory />
              },
              {
                path: ":id/edit",
                element: <EditCategory />
              }
            ]
          }
        ]
      },

      // 404
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
]);


export default router