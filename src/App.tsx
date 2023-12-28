import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="Home" element={<Home />} />
        <Route path="/*" element={<h1>Not Found Page</h1>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
