import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsAuthenticating(true);
      const response = await authService.login(
        formData.email,
        formData.password,
      );
      setIsSuccess(true);
      console.log(response);
      if (response) navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const errorData = error.response?.data;
      if (errorData?.detail) {
        setErrors({ submit: errorData.detail });
      } else {
        setErrors({ submit: "Login failed. Please try again." });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md text-on-surface bg-background relative overflow-hidden">
      {/* Visual Background Element (Atmospheric) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-1/2 h-1/2 bg-primary-container/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-1/2 h-1/2 bg-secondary-container/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_#dce9ff_0%,_transparent_25%),_radial-gradient(circle_at_0%_100%,_#eff4ff_0%,_transparent_25%)] opacity-50 mix-blend-multiply"></div>
      </div>

      {/* Login Container */}
      <main className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-lg text-center">
          <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center mb-md shadow-sm">
            <span
              className="material-symbols-outlined text-white text-[40px]"
              data-icon="account_balance"
            >
              account_balance
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Nexus Bank
          </h1>
          <p className="font-body-md text-on-surface-variant mt-xs">
            Secure financial management
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-surface-container-lowest p-md md:p-lg rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-[#E2E8F0]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">
            Welcome Back
          </h2>
          <p className="font-body-sm text-on-surface-variant mb-lg">
            Please enter your credentials to access your account.
          </p>

          <form className="space-y-md" onSubmit={handleLogin}>
            {/* Email/Username Field */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface-variant"
                htmlFor="identity"
              >
                Email or Username
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline"
                  data-icon="person"
                >
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all text-body-md outline-none"
                  id="identity"
                  name="identity"
                  placeholder="name@example.com"
                  required
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="text-primary font-label-md text-label-md hover:underline"
                  to="#"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-[#F8FAFC] border-none rounded-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all text-body-md outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                {errors.submit && (
                  <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
                    {errors.submit}
                  </div>
                )}
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon={showPassword ? "visibility_off" : "visibility"}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-base">
              <input
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                id="remember"
                type="checkbox"
              />
              <label
                className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer"
                htmlFor="remember"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full font-label-lg text-label-lg py-4 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-base ${isSuccess ? "bg-tertiary-container text-on-tertiary-container" : "bg-primary hover:bg-surface-tint text-white"}`}
              type="submit"
              disabled={isAuthenticating || isSuccess}
            >
              {isAuthenticating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </>
              ) : isSuccess ? (
                <>
                  <span
                    className="material-symbols-outlined"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  Secure Access Granted
                </>
              ) : (
                <>
                  Sign In
                  <span
                    className="material-symbols-outlined"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-lg pt-lg border-t border-outline-variant flex flex-col items-center gap-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account yet?
            </p>
            <Link to="/register" className="w-full">
              <button className="w-full border border-secondary text-secondary font-label-lg text-label-lg py-3 rounded-lg hover:bg-surface-container-low active:scale-[0.98] transition-all">
                Register for Online Banking
              </button>
            </Link>
          </div>
        </div>

        {/* Trust Badges / Footer */}
        <div className="mt-lg flex flex-col items-center gap-sm">
          <div className="flex items-center gap-md opacity-60">
            <div className="flex items-center gap-xs">
              <span
                className="material-symbols-outlined text-[18px]"
                data-icon="verified_user"
              >
                verified_user
              </span>
              <span className="font-label-md text-label-md">FDIC Insured</span>
            </div>
            <div className="flex items-center gap-xs">
              <span
                className="material-symbols-outlined text-[18px]"
                data-icon="encrypted"
              >
                encrypted
              </span>
              <span className="font-label-md text-label-md">256-bit AES</span>
            </div>
          </div>
          <div className="text-center font-body-sm text-[12px] text-outline mt-base">
            © 2024 Nexus Bank. All rights reserved.
            <div className="flex justify-center gap-md mt-xs">
              <Link className="hover:text-primary transition-colors" to="#">
                Privacy Policy
              </Link>
              <Link className="hover:text-primary transition-colors" to="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
