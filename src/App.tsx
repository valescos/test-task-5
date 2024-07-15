import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProfileDetails from "./pages/ProfileDetails";
import SignUpLogIn from "./pages/SignUpLogIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/signup" element={<SignUpLogIn />} />
      <Route path="/:id" element={<ProfileDetails />} />
    </Routes>
  );
}

export default App;
