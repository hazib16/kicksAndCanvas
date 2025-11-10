import { Routes, Route, Navigate } from 'react-router-dom';
import authRoutes from './auth/authRoutes';
import userRoutes from './user/userRoutes';
import productRoutes from './product/productRoutes';
import adminRoutes from './admin/adminRoutes'; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      {authRoutes}
      
      {/* User Routes */}
      {userRoutes}
      
      {/* Product Routes */}
      {productRoutes}
      
      {/* Admin Routes */}
      {adminRoutes}
      
      {/* Fallback for undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
