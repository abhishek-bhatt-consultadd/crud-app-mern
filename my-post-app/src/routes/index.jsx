import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
  } from "react-router-dom";
  import ProtectedRoute from "../pages/ProtectedRoute";
  import HomePage from "../pages/HomePage";
  import Signin from "../pages/SignIn";
  import Signup from "../pages/SignUp";

const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />}/>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    )
  );



  export default routes;