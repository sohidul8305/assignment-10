import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layouts/Root.jsx'
import Home from './components/Home.jsx'
import FindPartners from './components/FindPartners.jsx'
import Login from './components/Login.jsx'


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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
