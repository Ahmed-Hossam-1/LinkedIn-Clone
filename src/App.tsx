import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { getUserAuth } from "./redux/actions";
import { useDispatch } from "react-redux";
import RequireAuth from "./auth/RequireAuth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth() as any);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route
          path="Home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<h1>Not Found Page</h1>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
