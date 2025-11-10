import { Route } from 'react-router-dom';
import PublicRoute from '../PublicRoute';
import Login from '../../pages/User/Login';
import SignUp from '../../pages/User/SignUp';
import ForgotPassword from '../../pages/User/ForgotPassword';
import ResetPassword from '../../pages/User/ResetPassword';

export const authRoutes = [
  <Route 
    key="login"
    path="/login" 
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    } 
  />,
  
  <Route 
    key="signup"
    path="/signup" 
    element={
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    } 
  />,
  
  <Route 
    key="forgot-password"
    path="/forgot-password" 
    element={
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    } 
  />,
  
  <Route 
    key="reset-password"
    path="/reset-password/:token" 
    element={
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    } 
  />,
];

export default authRoutes;
