import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import PublicOnlyRoutes from "./PublicOnlyRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { Header } from "../components/layout/Header";
import { Layout } from "../components/layout/Layout";

const routes: { [key: string]: RouteObject[] } = {
  protected: [
    {
      path: "/",
      element: "<Home />",
    },
  ],
  publicOnly: [
    {
      path: "/login",
      element: "<Login />",
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
