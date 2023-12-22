import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
