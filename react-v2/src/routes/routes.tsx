import { createBrowserRouter } from "react-router-dom";
import { AppLayout, Callback, Error, Home, Role } from "../LazyComponents";
import callbackLoader from "../pages/callbackLoader";
import roleLoader from "../pages/roleLoader";

/* const lazyLoader = (loaderPath: string) => async () => {
  const { default: loader } = await import(loaderPath);
  return loader;
}; */

export const routes = [
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/callback",
        element: <Callback />,
        loader: callbackLoader,
        errorElement: <Error />,
      },
      {
        path: "/role",
        element: <Role />,
        loader: roleLoader,
        errorElement: <Error />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
