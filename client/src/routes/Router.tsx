import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// lazy
const Home = lazy(() => import("@/pages/home"));
const SalesPage = lazy(() => import("@/pages/sales"));
const PartiesPage = lazy(() => import("@/pages/party"));
const ExpensesPage = lazy(() => import("@/pages/expenses"));
const PartyDetailsPage = lazy(() => import("@/pages/party/PartyDetails"));

const Router = () => {
  const route = useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/parties",
      element: <PartiesPage />,
    },
    {
      path: "/parties/:id",
      element: <PartyDetailsPage />,
    },
    {
      path: "/sales",
      element: <SalesPage />,
    },
    {
      path: "/expenses",
      element: <ExpensesPage />,
    },
  ]);

  return route;
};

export default Router;
