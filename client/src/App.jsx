import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/User/SignUp";
import Home from "./pages/User/Home";
import Collection from "./pages/User/Collection";
import Product from "./pages/User/Product";
import Cart from "./pages/User/Cart";
import Login from "./pages/User/Login";
import PlaceOrder from "./pages/User/PlaceOrder";
import Orders from "./pages/User/Orders";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home/>} />
      <Route path="/collection" element={<Collection/>} />
      <Route path="/product/:productId" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/place-order" element={<PlaceOrder/>} />
      <Route path="/orders" element={<Orders/>} />
      
    </Routes>
  );
}

export default App;
