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
import { Toaster } from 'react-hot-toast'
import TopStudy from './components/TopStudy.jsx'
import StudyCards from './components/StudyCards.jsx'
import PartnerDetails from './components/PartnerDetaills.jsx'
import Profileuser from './components/Profileuser.jsx'
import CreatePartnerProfile from './components/CreatePartnerProfile.jsx'
import MyConnection from './components/MyConnection.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <Home />,
         loader: () => fetch("http://localhost:3000/study"),
      },
      {
        path: "findpartners",
        element: <FindPartners />,
         loader: () => fetch('http://localhost:3000/study'),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "topstudy",
        element: <TopStudy />,
          loader: ({ params }) =>
    fetch(`http://localhost:3000/study/${params.id}`),
       
      },
      {
        path: "studycards",
        element: <StudyCards />,
       
      },
      {
        path: "profileuser",
        element: <Profileuser />,
       
      },
      {
        path: "createpartnerprofile",
        element: <CreatePartnerProfile />,
       
      },
      {
        path: "myconnections",
        element: <MyConnection />,
        
       
      },
      {
        path: "partnerdetails/:id",
        element: <PartnerDetails />,
        loader: ({ params }) =>
    fetch(`http://localhost:3000/study/${params.id}`),
       
      },
    
    
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router}></RouterProvider>
  <Toaster  position="top-right" reverseOrder={false}></Toaster>
    </AuthProvider>
  </StrictMode>,
)
