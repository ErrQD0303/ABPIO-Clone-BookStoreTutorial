import { lazy } from "react";

export const AppLayout = lazy(() => import("./layouts/AppLayout"));
export const Error = lazy(() => import("./pages/Error"));
export const Home = lazy(() => import("./pages/Home"));
export const Callback = lazy(() => import("./pages/Callback"));
export const Role = lazy(() => import("./pages/Role"));
