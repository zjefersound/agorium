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
import { PostPage } from "../pages/PostPage";
import { Categories } from "../pages/Categories";
import { Tags } from "../pages/Tags";
import { NewPost } from "../pages/NewPost";
import { Search } from "../pages/Search";
import { EditPost } from "../pages/EditPost";
import { Rankings } from "../pages/Rankings";
import { Profile } from "../pages/Profile";
import { ProfileEdit } from "../pages/ProfileEdit";
import { NotFound } from "../components/layout/NotFound";

const routes: { [key: string]: RouteObject[] } = {
  protected: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/categories/:id",
      element: <Categories />,
    },
    {
      path: "/new-post",
      element: <NewPost />,
    },
    {
      path: "/post/:id",
      element: <PostPage />,
    },
    {
      path: "/post/:id/edit",
      element: <EditPost />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/profile/edit",
      element: <ProfileEdit />,
    },
    {
      path: "/tags",
      element: <Tags />,
    },
    {
      path: "/tags/:id",
      element: <Tags />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/rankings",
      element: <Rankings />,
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
    element: <NotFound />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
