import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProfileDetails from "./pages/ProfileDetails";
import SignUpLogIn from "./pages/SignUpLogIn";
import WrongPath from "./pages/WrongPath";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/error" element={<WrongPath />} />
      <Route path="/signup" element={<SignUpLogIn />} />
      <Route path="/:id" element={<ProfileDetails />} />
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
