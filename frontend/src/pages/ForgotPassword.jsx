import React, { useState, useEffect } from "react";
import { KeyRound, Eye, EyeOff, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {

  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // ✅ Initialize from localStorage (NO useEffect needed)
  const [otpLockedUntil, setOtpLockedUntil] = useState(() => {
    const storedLock = localStorage.getItem("otpLock");

    if (!storedLock) return null;

    const lockTime = parseInt(storedLock);

    if (lockTime > Date.now()) {
      return lockTime;
    } else {
      localStorage.removeItem("otpLock");
      return null;
    }
  });

  const [isOtpLocked, setIsOtpLocked] = useState(() => {
    return otpLockedUntil && otpLockedUntil > Date.now();
  });

  // ✅ Timer Effect (SAFE)
  useEffect(() => {
    if (!otpLockedUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = otpLockedUntil - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setOtpLockedUntil(null);
        localStorage.removeItem("otpLock");
        setOtpTimer(0);
        setIsOtpLocked(false);
      } else {
        setOtpTimer(Math.floor(remaining / 1000));
        setIsOtpLocked(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpLockedUntil]);

  // ✅ SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (isOtpLocked) return;

    try {
      await axios.post("https://rubiscape-admin-console.onrender.com/api/auth/send-otp", {
        username
      });

      alert("OTP sent successfully");

      const lockTime = Date.now() + 60 * 1000;

      setOtpLockedUntil(lockTime);
      setIsOtpLocked(true);
      localStorage.setItem("otpLock", lockTime);

    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // ✅ RESET PASSWORD
  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://rubiscape-admin-console.onrender.com/api/auth/reset-password", {
        username,
        otp,
        newPassword
      });

      alert("Password reset successful");

    } catch (err) {
      console.error(err);
      alert("Invalid OTP or error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 
        backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 
        rounded-2xl p-8 shadow-xl">

        {/* Title */}
        <div className="flex items-center justify-center mb-6 space-x-2">
          <KeyRound className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Forgot Password
          </h2>
        </div>

        <form className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Email / Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Send OTP */}
          <button
            type="button"
            onClick={sendOtp}
            disabled={isOtpLocked}
            className="w-full py-2.5 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isOtpLocked ? `Wait ${otpTimer}s` : "Send OTP"}
          </button>

          {/* OTP */}
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {isOtpLocked && (
              <p className="text-red-500 text-xs mt-1">
                New OTP can be generated in {otpTimer}s
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full mt-1 px-4 py-2.5 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white
                focus:ring-2 focus:ring-blue-500 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </span>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetPassword}
            className="w-full py-2.5 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:shadow-lg transition-all"
          >
            Reset Password
          </button>
        </form>

        {/* Bottom Links */}
        <div className="flex justify-between mt-6 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>

          <Link to="/help" className="flex items-center space-x-1 text-blue-600 hover:underline">
            <HelpCircle size={16} />
            <span>Help</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;