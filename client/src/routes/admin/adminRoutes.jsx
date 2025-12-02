import { Route } from 'react-router-dom';
import AdminProtectedRoute from '../AdminProtectedRoute'; 
import AdminDashboard from '../../pages/Admin/Dashboard'
import ProductManagement from '../../pages/Admin/ProductManagement';
import OrderManagement from '../../pages/Admin/OrderManagement';
import UserManagement from '../../pages/Admin/UserManagement';
import AdminLoginForm from '../../pages/Admin/AdminLogin';

export const adminRoutes = [
  // Public admin login route
  <Route
    key="admin-login"
    path="/admin/login"
    element={<AdminLoginForm />}
  />,

  // Protected admin routes
  <Route 
    key="admin-dashboard"
    path="/admin/dashboard" 
    element={
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    } 
  />,
  
  <Route 
    key="admin-products"
    path="/admin/products" 
    element={
      <AdminProtectedRoute>
        <ProductManagement />
      </AdminProtectedRoute>
    } 
  />,
  
  <Route 
    key="admin-orders"
    path="/admin/orders" 
    element={
      <AdminProtectedRoute>
        <OrderManagement />
      </AdminProtectedRoute>
    } 
  />,
  
  <Route 
    key="admin-users"
    path="/admin/users" 
    element={
      <AdminProtectedRoute>
        <UserManagement />
      </AdminProtectedRoute>
    } 
  />,

  // Redirect /admin to /admin/dashboard
  <Route 
    key="admin-root"
    path="/admin" 
    element={
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    } 
  />,
];

export default adminRoutes;
