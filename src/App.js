import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePostPopup from "./components/createPostPopup";
import Activate from "./pages/home/Activate";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ResetPass from "./pages/reset";
import LoggedinRoute from "./routes/LoggedinRoute";
import NotLoggedin from "./routes/NotLoggedin";
function App() {
  const {user} = useSelector((state) => ({...state}))
  return (
    <div>
      {
        user && 
      <CreatePostPopup user={user} />
      }
      <Routes>
        <Route element={<LoggedinRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>
        <Route element={<NotLoggedin />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;
