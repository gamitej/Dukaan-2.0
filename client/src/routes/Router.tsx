import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// lazy
const Home = lazy(() => import("@/pages/home"));
const PartyDetailsPage = lazy(() => import("@/pages/party/PartyDetails"));
const StockDetailsPage = lazy(() => import("@/pages/stocks/StockDetails"));

const Router = () => {
  const route = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/party/:name",
      element: <PartyDetailsPage />,
    },
    {
      path: "/stock/:name",
      element: <StockDetailsPage />,
    },
  ]);

  return route;
};

export default Router;
