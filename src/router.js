import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import App from "./App";
import Signup from "./components/auth/Signup";
// import AddUrl from "./components/auth/AddUrl";
import ListUrl from "./components/auth/ListUrl";
import Home from "./components/Home";
// import RedirectToUrl from "./components/RedirectToUrl";
import { Navigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import AddUrl from "./components/auth/AddUrl";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: '/signup', element: <Signup/> },
    { path: '/login', element: <Login/> },
    { path: '/logout', element: <Logout/> },
    {path: '/add',  element: localStorage.getItem('loggedInUser') ? <AddUrl /> : <Navigate to="/login" /> },
    {path: '/list',  element: localStorage.getItem('loggedInUser') ? <ListUrl /> : <Navigate to="/login" /> },
    {path: '/home',  element: localStorage.getItem('loggedInUser') ? <Home /> : <Navigate to="/login" /> },
    // {path:  '/home', element:<Home />} ,

    // {path:  '/short/:shortUrl', element:<RedirectToUrl />} ,
    {path:  '/aboutus', element:<AboutUs />} ,




    
  


]);

export default router;