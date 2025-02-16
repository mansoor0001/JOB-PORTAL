import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";
import Profile from "./components/profile/Profile";
import Description from "./components/pages/Description";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AdminCompanies from "./components/AdminPage/admincompanies/AdminCompanies";
import AdminJobs from "./components/AdminPage/adminjobs/AdminJobs";
import CreateCompany from "./components/AdminPage/admincompanies/CreateCompany";
import CompanyDetails from "./components/AdminPage/admincompanies/CompanyDetails";
import PostJob from "./components/AdminPage/adminjobs/PostJob";
import Applicants from "./components/AdminPage/applicants/Applicants";
import UpdateJobDetails from "./components/AdminPage/adminjobs/UpdateJobDetails";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute";
import UserProtectedRoute from "./components/protectedRoute/UserProtecedRoute";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  dispatch(setUser(user))



  return <>

    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
        <Route path="/description/:id" element={<Description />} />

        <Route
          path="/admin/companies"
          element={<AdminProtectedRoute><AdminCompanies /></AdminProtectedRoute>} />
        <Route
          path="/admin/createcompany"
          element={<AdminProtectedRoute> <CreateCompany /> </AdminProtectedRoute>} />

        <Route
          path="/admin/company/details/:id"
          element={<AdminProtectedRoute><CompanyDetails /></AdminProtectedRoute>} />

        <Route path="/admin/jobs"
          element={<AdminProtectedRoute><AdminJobs /></AdminProtectedRoute>} />

        <Route path="/admin/job/post"
          element={<AdminProtectedRoute><PostJob /></AdminProtectedRoute>} />

        <Route path="/admin/job/details/:id"
          element={<AdminProtectedRoute><UpdateJobDetails /></AdminProtectedRoute>} />

        <Route path="/admin/job/:id/applicants"
          element={<AdminProtectedRoute><Applicants /></AdminProtectedRoute>} />


      </Route>
    </Routes>

  </>

}

export default App;