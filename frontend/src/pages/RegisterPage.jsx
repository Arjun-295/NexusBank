import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrors({
        confirm_password: "Passwords do not match",
      });
      return;
    }
    setErrors({});
    console.log("handling sign up");
    try {
      setIsRegistering(true);
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      });
      console.log(response);
      if (response) navigate("/login");
    } catch (error) {
      console.log(error);
      const errorData = error.response?.data;
      if (errorData?.detail) {
        setErrors({ submit: errorData.detail });
      } else {
        setErrors({ submit: "Registration failed. Please try again." });
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-body-md text-on-surface px-margin-mobile bg-background relative overflow-hidden">
      {/* Brand Header */}
      <header className="mb-lg flex flex-col items-center z-10">
        <div className="flex items-center gap-xs mb-xs">
          <span
            className="material-symbols-outlined text-primary text-[40px]"
            data-icon="account_balance"
          >
            account_balance
          </span>
          <h1 className="font-headline-lg text-headline-lg font-extrabold text-primary tracking-tight">
            Nexus Bank
          </h1>
        </div>
        <p className="font-label-lg text-label-lg text-on-surface-variant">
          Secure digital banking for the next generation
        </p>
      </header>

      {/* Registration Card */}
      <main className="w-full max-w-[520px] bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-[0px_12px_32px_rgba(10,37,64,0.06)] overflow-hidden z-10">
        <div className="p-md md:p-lg">
          <div className="mb-md">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">
              Create an Account
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Please fill in your details to join Nexus Bank.
            </p>
          </div>
          {errors.submit && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form className="space-y-base" onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="first_name"
              >
                First Name
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  data-icon="person"
                >
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                  id="first_name"
                  name="first_name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  data-icon="person"
                >
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                  id="last_name"
                  name="last_name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
              <div className="space-y-xs">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant ml-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                    data-icon="mail"
                  >
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                    id="email"
                    name="email"
                    placeholder="john@nexus.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-xs">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant ml-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                    data-icon="call"
                  >
                    call
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                    id="phone"
                    name="phone"
                    placeholder="+1 234 567 890"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* KYC Field (Optional) */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center ml-1">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="kyc_id"
                >
                  Aadhaar / PAN
                </label>
                <span className="text-[10px] uppercase font-bold text-outline-variant tracking-wider">
                  Optional
                </span>
              </div>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  data-icon="badge"
                >
                  badge
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                  id="kyc_id"
                  name="kyc_id"
                  placeholder="Enter ID number"
                  type="text"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    data-icon={showPassword ? "visibility_off" : "visibility"}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  data-icon="verified_user"
                >
                  verified_user
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-[4px] focus:ring-primary/10 outline-none"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-sm pt-xs">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                />
              </div>
              <label
                className="font-body-sm text-body-sm text-on-surface-variant"
                htmlFor="terms"
              >
                I agree to the{" "}
                <Link
                  className="text-primary font-semibold hover:underline"
                  to="#"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="text-primary font-semibold hover:underline"
                  to="#"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Actions */}
            <div className="pt-md">
              <button
                className={`w-full py-3 font-label-lg text-label-lg rounded-lg shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-xs ${isRegistering ? "opacity-80 cursor-not-allowed bg-primary text-white" : "bg-primary hover:bg-surface-tint text-white"}`}
                type="submit"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <span
                      className="material-symbols-outlined animate-spin"
                      data-icon="progress_activity"
                    >
                      progress_activity
                    </span>{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    Create Account
                    <span
                      className="material-symbols-outlined text-[20px]"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-md pt-md border-t border-outline-variant/30 text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?
              <Link
                className="text-primary font-bold hover:underline transition-all active:scale-[0.98] inline-block ml-1"
                to="/login"
              >
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Atmospheric Footer Text */}
      <footer className="mt-lg mb-md text-center max-w-[400px] z-10">
        <p className="font-label-md text-label-md text-outline">
          © 2024 Nexus Bank. Your financial security is our absolute priority.
          ISO 27001 Certified.
        </p>
      </footer>
    </div>
  );
}
