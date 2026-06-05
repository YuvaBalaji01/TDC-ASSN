import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login({
        username,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
          The Date Crew
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Matchmaker Dashboard
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-pink-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Demo Credentials:
          <br />
          Username: admin
          <br />
          Password: admin123
        </div>
      </div>
    </div>
  );
}

export default Login;