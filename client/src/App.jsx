import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CustomerLayout from "./layouts/customer_layout.jsx";
import Home from "./pages/customer/home.jsx";
import Cart from "./pages/customer/cart.jsx";
import Login from "./pages/customer/login.jsx";
import SignUp from "./pages/customer/signup.jsx";
import { Toaster } from "sonner";
import { useRef } from "react";
import './App.css'

function App() {
  const contactUsRef = useRef(null);

  const scrollToContactUs = () => {
    contactUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerLayout scrollToContactUs={scrollToContactUs} />,
      children: [
        { index: true, element: <Home contactUsRef={contactUsRef} /> },
        { path: "cart", element: <Cart /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App
