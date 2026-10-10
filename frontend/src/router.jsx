import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import App from "./App.jsx";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ErrorPage from "./pages/ErrorPage";

// Public pages
const Home = lazy(() => import("./pages/public/Home"));
const Category = lazy(() => import("./pages/public/Category"));
const Project = lazy(() => import("./pages/public/Project"));
const About = lazy(() => import("./pages/public/About"));
const Contact = lazy(() => import("./pages/public/Contact"));

// Admin pages
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const NewProject = lazy(() => import("./pages/admin/NewProject"));
const EditProject = lazy(() => import("./pages/admin/EditProject"));
const ProjectView = lazy(() => import("./pages/admin/ProjectView"));
const CategoryView = lazy(() => import("./pages/admin/CategoryView"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory.jsx"));
const EditCategory = lazy(() => import("./pages/admin/EditCategory"));
const EditSiteSettings = lazy(() => import("./pages/admin/EditSiteSettings"));

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
            element: <Home />,
          },
          {
            path: "category/:slug",
            element: <Category />,
          },
          {
            path: "project/:slug",
            element: <Project />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          }
        ],
      },

      // ADMIN
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          // PROTECTED ADMIN ROUTES
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "site-settings/edit",
                element: <EditSiteSettings />,
              },
              {
                path: "projects",
                children: [
                  {
                    path: ":id",
                    element: <ProjectView />,
                  },
                  {
                    path: "new",
                    element: <NewProject />,
                  },
                  {
                    path: ":id/edit",
                    element: <EditProject />,
                  },
                ],
              },
              {
                path: "categories",
                children: [
                  {
                    path: ":id",
                    element: <CategoryView />,
                  },
                  {
                    path: "create",
                    element: <CreateCategory />,
                  },
                  {
                    path: ":id/edit",
                    element: <EditCategory />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // 404
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
