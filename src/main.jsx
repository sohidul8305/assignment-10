import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
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
import LoadingSpinner from './components/LoadingSpinner.jsx'
import NotFound from './components/NotFound.jsx'
import UpdateConnection from './components/UpdateConnection.jsx'
import Partnersdetails from './components/Partnersdetails.jsx'
import TopDetails from './components/Topdetails.jsx'
// import UpdateModal from './components/UpdateModal.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <Home />,
        loader: () => fetch("https://assignment-10-server-zeta-gold.vercel.app/study"),
      },
      {
        path: "findpartners",
        element: <FindPartners />,
        loader: () => fetch('https://assignment-10-server-zeta-gold.vercel.app/study'),
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
        path: "/update/:id",
        element: <UpdateConnection />,
      },
      {
        path: "topstudy",
        element: <TopStudy />,
        loader: ({ params }) => fetch(`https://assignment-10-server-zeta-gold.vercel.app/study${params.id}`),
      },
      {
        path: "studycards",
        element: <StudyCards />,
      },
      {
        path: "/profileuser/:id",
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
      // {
      //   path: "updatemodel",
      //   element: <UpdateModal />,
      // },
    {
  path: "topdetails/:id",
  element: <TopDetails />,
  loader: ({ params }) =>
    fetch(`https://assignment-10-server-zeta-gold.vercel.app/study/${params.id}`),
},
      {
        path: "loadingspinner",
        element: <LoadingSpinner />,
      },
      {
        path: "/partnerdetails/:id",
        element: <Partnersdetails />,
      },
{
  path: "partnerdetails/:id",
  element: <PartnerDetails />,
  loader: ({ params }) =>
    fetch(`https://assignment-10-server-zeta-gold.vercel.app/study/${params.id}`),
},
      
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);