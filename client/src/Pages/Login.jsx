// src/components/LoginForm.js
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure to have react-router-dom installed
import { authContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading, token } = useContext(authContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleLogin({
      email: email,
      password: password,
    });

    if (response?.status === "Success") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="font-primary flex items-center justify-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label
            
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
           autocomplete="off"
            className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
