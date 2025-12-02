import { Routes, Route, Navigate } from "react-router-dom";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./user/userRoutes";
import productRoutes from "./product/productRoutes";
import adminRoutes from "./admin/adminRoutes";

// Public pages
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Legal/Terms";
import Privacy from "../pages/Legal/Privacy";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========== USER ROUTES ========== */}
      {userRoutes}

      {/* ========== PRODUCT ROUTES ========== */}
      {productRoutes}

      {/* ========== AUTH ROUTES ========== */}
      {authRoutes}

      {/* ========== ADMIN ROUTES ========== */}
      {adminRoutes}

      {/* ========== ADDITIONAL PUBLIC PAGES ========== */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* ========== 404 NOT FOUND ========== */}
      <Route path="/404" element={<NotFound />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
