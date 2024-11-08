import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./pages/Error";
import { Home, HomeLayout } from "./pages/home-layout";
import { SignUp, SignIn, AuthLayout } from "./pages/auth";
import { coversLoader } from "./components/CoversContainer";
import CoverDetails, { coverDetailsLoader } from "./components/CoverDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: coversLoader,
      },
      {
        path: "/covers/:slug",
        element: <CoverDetails />,
        loader: coverDetailsLoader
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
