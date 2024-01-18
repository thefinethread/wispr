import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainWrapper from "./components/wrappers/MainWrapper";
import Chats from "./pages/Chats";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Private Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/chats" element={<Chats />} />
          </Route>
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}
export default App;
