import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppDashboard from "./pages/AppDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="chats" element={<AppDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
