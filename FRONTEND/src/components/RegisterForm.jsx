import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { registerUser } from "../api/user.api"; // Assuming you have an API function to handle registration
import TextInput from "./TextInput";
import Button from "./Button";
const RegisterForm = ({ registerState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(name, email, password);
      if (data.success) {
        setLoading(false);
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex w-100 items-center justify-center  bg-gradient-to-br">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Register
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}

        <TextInput
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextInput
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="text-center text-sm text-gray-600 mt-4">
          {" "}
          Already have an account?{" "}
          <span
            onClick={() => registerState(true)}
            className=" cursor-pointer text-sm text-center text-blue-500 mt-2"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
