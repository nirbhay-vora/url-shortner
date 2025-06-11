import { createRootRoute } from "@tanstack/react-router";
import App from "../App.jsx";
import { homePageRoute } from "./HomePage.js";
import { dashboardRoute } from "./dashboard.js";
import { authRoute } from "./auth.route.js";

export const rootRoute = createRootRoute({
  component: App,
});

export const routeTree = rootRoute.addChildren([authRoute, homePageRoute, dashboardRoute]);
