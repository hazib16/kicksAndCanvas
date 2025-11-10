import { Route } from 'react-router-dom';
import AdminProtectedRoute from '../AdminProtectedRoute'; 
import AdminDashboard from '../../pages/Admin/Dashboard.jsx';
import ProductManagement from '../../pages/Admin/ProductManagement';
import OrderManagement from '../../pages/Admin/OrderManagement';
import UserManagement from '../../pages/Admin/UserManagement';

export const adminRoutes = [
  <Route 
    key="admin-dashboard"
    path="/admin" 
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
];

export default adminRoutes;
