import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Navigation from './Pages/Shared/Navigation/Navigation';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './Contexts/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import Payment from './Pages/Dashboard/Payment/Payment';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';

function App () {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navigation></Navigation>
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/home" element={ <Home /> } />
            <Route path="/appointment" element={ <PrivateRoute><Appointment /></PrivateRoute> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> }>
              <Route path="/dashboard" element={ <DashboardHome /> } />
              <Route path="/dashboard/payment/:appointmentId" element={ <Payment /> } />
              <Route path="/dashboard/makeAdmin" element={ <AdminRoute><MakeAdmin /></AdminRoute> } />
              <Route path="/dashboard/addDoctor" element={ <AdminRoute><AddDoctor /></AdminRoute> } />
            </Route>
            <Route exact path="*" element={ <ErrorPage /> } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;