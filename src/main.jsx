import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Root from "./Layouts/Root.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Existing Components
import Home from "./components/Home.jsx";
import FindPartners from "./components/FindPartners.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UpdateConnection from "./components/UpdateConnection.jsx";
import TopStudy from "./components/TopStudy.jsx";
import StudyCards from "./components/StudyCards.jsx";
import Profileuser from "./components/Profileuser.jsx";
import CreatePartnerProfile from "./components/CreatePartnerProfile.jsx";
import MyConnection from "./components/MyConnection.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import NotFound from "./components/NotFound.jsx";
import PartnerDetails from "./components/Partnersdetails.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import BlogDetail from "./components/BlogDetail.jsx";

// Dashboard Components
import DashboardLayout from "../src/Layouts/DashboardLayout.jsx";
import DashboardHome from "../src/pages/Dashboard/DashboardHome.jsx";
import Profile from "../src/pages/Dashboard/Profile";
import AddItem from "../src/pages/Dashboard/User/AddItem.jsx";
import MyItems from "../src/pages/Dashboard/User/MyItems.jsx";
import ManageUsers from "../src/pages//Dashboard/Admin/ManageUsers.jsx";
import ManageItems from "../src/pages/Dashboard/Admin/ManageItems";
import TopStudyDetails from "./components/Topdetails.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Reports from "./pages/Dashboard/Admin/Reports.jsx";

// Create React Query Client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: () => fetch("https://assignmentserver-lovat.vercel.app/study") },
      { path: "findpartners", element: <FindPartners />, loader: () => fetch("https://assignmentserver-lovat.vercel.app/study") },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "update/:id", element: <UpdateConnection /> },
      { path: "topstudy", element: <TopStudy /> },
      { path: "studycards", element: <StudyCards /> },
      { path: "profileuser", element: <Profileuser /> },
      { path: "createpartnerprofile", element: <CreatePartnerProfile /> },
      { path: "myconnections", element: <MyConnection /> },
      { path: "topdetails/:id", element: <TopStudyDetails /> },
      { path: "loadingspinner", element: <LoadingSpinner /> },
      { path: "partnerdetails/:id", element: <PartnerDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
// App.jsx (Router)
{
  path: "/dashboard",
  element: <PrivateRoute role="user"><DashboardLayout /></PrivateRoute>,
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "profile", element: <Profile /> },
    { path: "add-item", element: <AddItem /> },
    { path: "my-items", element: <MyItems /> },
  ],
},
{
  path: "/admin",
  element: <PrivateRoute role="admin"><DashboardLayout /></PrivateRoute>,
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "manage-users", element: <ManageUsers /> },
    { path: "manage-items", element: <ManageItems /> },
    { path: "/admin/reports", element: <Reports /> },
  ],
},

      // Fallback Routes
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
