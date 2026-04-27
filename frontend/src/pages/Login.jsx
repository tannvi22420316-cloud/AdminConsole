import React, { useState, useEffect } from "react";
import { FaUserShield, FaUser, FaQuestionCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(() => {
    const storedLock = localStorage.getItem("adminLock");

    if (storedLock) {
        const lockTime = parseInt(storedLock);
        return lockTime > Date.now() ? lockTime : null;
    }

    return null;
    });
  const [timer, setTimer] = useState("");

  useEffect(() => {
    if (!lockUntil) return;

    const interval = setInterval(() => {
      const remaining = lockUntil - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        setLockUntil(null);
        setAttempts(0);
        localStorage.removeItem("adminLock");
        setTimer("");
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimer(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockUntil]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isAdmin && lockUntil && lockUntil > Date.now()) {
      alert("Admin login frozen. Please wait.");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        username,
        password,
        role: isAdmin ? "admin" : "user",
      });

      const { token, role } = res.data;
      localStorage.setItem("token", token);

      role === "admin" ? navigate("/admin") : navigate("/user");
    } catch (error) {
      console.error("Login error:", error);

      if (isAdmin) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          const lockTime = Date.now() + 15 * 60 * 1000;
          setLockUntil(lockTime);
          localStorage.setItem("adminLock", lockTime);
        }
      }

      const serverMessage = error.response?.data?.message || error.message || "Invalid login credentials or unauthorized role";
      alert(serverMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      <div className="w-full max-w-md p-8 rounded-2xl 
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
        border border-slate-200/50 dark:border-slate-700/50 
        shadow-xl">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6 flex items-center justify-center gap-2">
          {isAdmin ? <FaUserShield /> : <FaUser />}
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-slate-500">Email / Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-xl 
              bg-slate-100 dark:bg-slate-800 
              border border-slate-200 dark:border-slate-700 
              text-slate-800 dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {isAdmin && lockUntil && (
              <p className="text-red-500 text-xs mt-1">
                Login frozen. Try again in {timer}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-500">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-10 rounded-xl 
                bg-slate-100 dark:bg-slate-800 
                border border-slate-200 dark:border-slate-700 
                text-slate-800 dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        {/* Switch */}
        <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
          {isAdmin ? (
            <>
              User access?{" "}
              <span
                onClick={() => setIsAdmin(false)}
                className="text-blue-500 cursor-pointer"
              >
                User Login
              </span>
            </>
          ) : (
            <>
              Admin access?{" "}
              <span
                onClick={() => setIsAdmin(true)}
                className="text-blue-500 cursor-pointer"
              >
                Admin Login
              </span>
            </>
          )}
        </div>

        {/* Bottom links */}
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password
          </Link>
          <Link to="/help" className="text-blue-500 flex items-center gap-1">
            <FaQuestionCircle /> Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;