import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProfileDetails from "./pages/ProfileDetails";
import SignUpLogIn from "./pages/SignUpLogIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/:id" element={<ProfileDetails />} />
      <Route path="/signup" element={<SignUpLogIn />} />
      <Route path="*" element={<div>БУМ</div>} />
    </Routes>
  );
}

export default App;
