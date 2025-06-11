import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/user.api";
import { logout } from "../store/slice/authSlice";
import { showSuccessToast } from "./toastMessage";
import Button from "./Button";
import CustomLink from "./Link";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const handleLogoutUser = async () => {
    const data = await logoutUser();
    if (data.success) {
      dispatch(logout());
      showSuccessToast(data.message || "Logout successful!");
      navigate({ to: "/auth" });
    }
  };
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="text-xl font-bold text-purple-700 cursor-pointer" onClick={() => navigate({to:"/"})}>URL Shortener</div>
      <div>
        {!isAuthenticated ? (
          <CustomLink
            to="/auth"
          >
            Login / Register
          </CustomLink>
        ) : (
          <p className="text-xl">Welcome  <span className="text-purple-600">{user.user.name} </span> :)</p>
        )}
      </div>

      {isAuthenticated && (
        <Button type="submit" onClick={handleLogoutUser}>
          Logout
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
