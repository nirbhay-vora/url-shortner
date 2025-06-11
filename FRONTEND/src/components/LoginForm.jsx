import { useState } from "react";
import { loginUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../store/slice/authSlice.js";
import Loading from "./Loading.jsx";
import { showSuccessToast } from "./toastMessage.jsx";
import TextInput from "./TextInput.jsx";
import Button from "./Button.jsx";

const LoginForm = ({ loginState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      if (data.success) {
        showSuccessToast(data.message || "Login successful!");
        dispatch(login(data.user));
        navigate({ to: "/dashboard" });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", err);
      return;
    }

    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex w-100 items-center justify-center  bg-gradient-to-br ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Login
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-center text-gray-600 mt-2">
          {" "}
          Don't have an account?{" "}
          <span
            onClick={() => loginState(false)}
            className="text-sm text-center text-blue-500 mt-2 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
