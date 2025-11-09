import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layouts/Root.jsx'
import Home from './components/Home.jsx'
import FindPartners from './components/FindPartners.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "findpartners",
        element: <FindPartners />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router}></RouterProvider>

    </AuthProvider>
  </StrictMode>,
)
