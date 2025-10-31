import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  SignUp  from "./pages/User/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
