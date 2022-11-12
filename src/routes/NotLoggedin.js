import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const NotLoggedin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedin;
