import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PublicOnlyRoutes } from "./PublicOnlyRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Header } from "../components/layout/Header";
import { Layout } from "../components/layout/Layout";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Signup } from "../pages/Signup";
import { Post } from "../pages/Post";

const routes: { [key: string]: RouteObject[] } = {
  protected: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/post/:id",
      element: <Post />,
    },
  ],
  publicOnly: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ],
  public: [
    {
      path: "/about",
      element: "<About />",
    },
  ],
};

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: (
          <Layout>
            <Header />
            <Outlet />
          </Layout>
        ),
        children: routes.protected,
      },
    ],
  },
  {
    element: <PublicOnlyRoutes />,
    children: routes.publicOnly,
  },
  ...routes.public,
  {
    path: "*",
    element: "<NotFound />",
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
