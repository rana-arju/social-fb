import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePostPopup from "./components/createPostPopup";
import { postReducer } from "./functions/reducers";
import Friend from "./pages/friend";
import Activate from "./pages/home/Activate";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ResetPass from "./pages/reset";
import LoggedinRoute from "./routes/LoggedinRoute";
import NotLoggedin from "./routes/NotLoggedin";

function App() {
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
    loading: false,
    error: "",
    posts: [],
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POST_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: data,
        error: "",
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: "POST_FAILED",
        payload: error?.response?.data.message,
      });
    }
  };
  useEffect(() => {
    getAllPosts();
  }, [user]);
  return (
    <div className={`${darkTheme && "dark"}`}>
      {user && visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<LoggedinRoute />}>
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
          />
          <Route path="/friends" element={<Friend />} />
          <Route path="/friends/:type" element={<Friend />} />
          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
          />
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
