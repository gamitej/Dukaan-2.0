import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// lazy
const Home = lazy(() => import("@/pages/home"));
const PartyDetailsPage = lazy(() => import("@/pages/party/PartyDetails"));
const PartiesPage = lazy(() => import("@/pages/party"));
const StockDetailsPage = lazy(() => import("@/pages/stocks/StockDetails"));
const StocksPage = lazy(() => import("@/pages/stocks"));

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
      path: "/stocks",
      element: <StocksPage />,
      children: [
        {
          path: ":name",
          element: <StockDetailsPage />,
        },
      ],
    },
  ]);

  return route;
};

export default Router;
