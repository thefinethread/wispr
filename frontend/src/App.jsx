import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainWrapper from "./components/wrappers/MainWrapper";
import Chats from "./pages/Chats";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}
export default App;
