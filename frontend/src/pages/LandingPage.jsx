import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  useEffect(() => {
    // Micro-interaction for the Nav Bar shadow on scroll
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        if (window.scrollY > 20) {
          nav.classList.add("shadow-md");
          nav.classList.remove("shadow-sm");
        } else {
          nav.classList.add("shadow-sm");
          nav.classList.remove("shadow-md");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Simple animation trigger for the shield
    const interval = setInterval(() => {
      const shield = document.querySelector('[data-icon="shield_lock"]');
      if (shield) {
        shield.classList.toggle("scale-105");
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <nav className="fixed top-0 left-0 right-0 w-[95%] lg:w-[90%] z-50 flex justify-between items-center px-6 h-20 max-w-[1600px] mx-auto bg-surface shadow-sm transition-all duration-300 mt-4 rounded-xl border border-outline-variant">
        <div className="flex items-center gap-lg">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            Nexus Bank
          </span>
          <div className="hidden md:flex gap-md">
            <Link
              className="font-label-lg text-label-lg text-primary font-bold border-b-2 border-primary pb-1"
              to="#"
            >
              Features
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Security
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Testimonials
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="hidden md:flex items-center gap-sm">
            <button
              className="material-symbols-outlined text-on-surface-variant hover:text-primary"
              data-icon="search"
            >
              search
            </button>
            <button
              className="material-symbols-outlined text-on-surface-variant hover:text-primary"
              data-icon="notifications"
            >
              notifications
            </button>
          </div>
          <div className="flex gap-sm">
            <Link to="/login">
              <button className="px-md py-2 text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors rounded-lg">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-md py-2 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:scale-[0.98] transition-all">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[819px] flex items-center overflow-hidden px-6 lg:px-12 max-w-[1600px] w-[95%] lg:w-[90%] mx-auto py-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
            <div className="lg:col-span-5 z-10">
              <span className="inline-block px-3 py-1 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-full mb-md">
                Trusted by 2M+ users
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-md w-full">
                Banking made simple and secure.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg w-full">
                Experience the next generation of financial freedom with
                lightning-fast transfers and world-class security protocols.
              </p>
              <div className="flex gap-md">
                <Link to="/register">
                  <button className="bg-primary text-on-primary px-lg py-md rounded-lg font-label-lg text-label-lg shadow-lg hover:scale-[0.98] transition-transform">
                    Get Started
                  </button>
                </Link>
                {/* <button className="flex items-center gap-sm border border-outline-variant px-lg py-md rounded-lg font-label-lg text-label-lg hover:bg-surface-container-low transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="play_circle"
                  >
                    play_circle
                  </span>
                  Watch Demo
                </button> */}
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] w-full">
              <div className="absolute inset-0 bg-primary-container/20 rounded-3xl -rotate-3 scale-105"></div>
              <img
                alt="Person using phone"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl border border-white/50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5zr7rT5RNTV9TF9Rr53SRKA-GT4OuSZ0xsJaNkIevYfYPcrP56rhi6R14Rhn3Wz4m-5t2femhvbCyB68dOqM6D_pflodYGHBpdxFwMnMac7CgdGRM_MlB5e-p4c3j1s9_vk6ZUpwwnE56z5e8BBNb4CndmjukT-isE-lKUNpC0FTwjDX6PAUAdvm3JVvXXV9KmXcAcl9hxrQxb2oGwb0plpsOsCOxk29Lgo-XWSMEw8Rvg6HXmRZSHtU6C8ZLxR1m0Deb3eyRpTwI"
              />
            </div>
          </div>
        </section>

        {/* Services Section (Bento Grid) */}
        <section className="py-xl px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
              Everything you need
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tailored financial tools for your digital life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Card 1: Savings */}
            <div className="bg-surface p-md rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded-lg mb-md">
                <span
                  className="material-symbols-outlined text-primary"
                  data-icon="savings"
                >
                  savings
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                Savings
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                Watch your wealth grow with high-yield interest accounts and
                automated round-ups.
              </p>
              <Link
                className="text-primary font-label-lg text-label-lg flex items-center gap-xs group"
                to="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
            {/* Card 2: Transfers */}
            <div className="bg-surface p-md rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary-container flex items-center justify-center rounded-lg mb-md">
                <span
                  className="material-symbols-outlined text-secondary"
                  data-icon="swap_horiz"
                >
                  swap_horiz
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                Transfers
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                Send money globally in seconds. No hidden fees, just transparent
                exchange rates.
              </p>
              <Link
                className="text-primary font-label-lg text-label-lg flex items-center gap-xs group"
                to="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
            {/* Card 3: Instant Deposits */}
            <div className="bg-surface p-md rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tertiary-container flex items-center justify-center rounded-lg mb-md">
                <span
                  className="material-symbols-outlined text-on-tertiary-container"
                  data-icon="payments"
                >
                  payments
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                Instant Deposits
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                Access your paycheck up to two days early with our direct
                deposit features.
              </p>
              <Link
                className="text-primary font-label-lg text-label-lg flex items-center gap-xs group"
                to="#"
              >
                Learn more{" "}
                <span
                  className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-on-background py-xl overflow-hidden">
          <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col lg:flex-row items-center gap-xl">
            <div className="flex-1 text-on-primary-container">
              <h2 className="font-headline-lg text-headline-lg mb-md text-surface-container-lowest">
                Security that never sleeps.
              </h2>
              <p className="font-body-lg text-body-lg text-surface-variant mb-lg">
                We employ multi-layered encryption and proactive monitoring to
                ensure your assets are always protected.
              </p>
              <ul className="space-y-md">
                <li className="flex items-start gap-md">
                  <span
                    className="material-symbols-outlined text-tertiary-fixed p-1"
                    data-icon="verified_user"
                  >
                    verified_user
                  </span>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-surface-container-lowest">
                      Advanced 2FA
                    </h4>
                    <p className="font-body-sm text-body-sm text-surface-variant">
                      Biometric and hardware key support for every transaction.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className="material-symbols-outlined text-tertiary-fixed p-1"
                    data-icon="gpp_good"
                  >
                    gpp_good
                  </span>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-surface-container-lowest">
                      Data Protection
                    </h4>
                    <p className="font-body-sm text-body-sm text-surface-variant">
                      End-to-end encryption complying with global banking
                      standards.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="z-10 bg-surface-container p-lg rounded-[2rem] shadow-2xl border border-white/20">
                  <span
                    className="material-symbols-outlined text-[120px] text-primary"
                    data-icon="shield_lock"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield_lock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-xl px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
              Join the Nexus Community
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hear from our members around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Testimonial 1 */}
            <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant flex flex-col justify-between">
              <div className="mb-md">
                <div className="flex gap-xs text-primary mb-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      data-icon="star"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface">
                  "The most intuitive banking app I've ever used. Transfers are
                  actually instant!"
                </p>
              </div>
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full overflow-hidden">
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKu79EnDckLfv04CdW5d_GTHp6Oajp1v5HvevJAHVcn0WIeHtnN2KST4tz8kf7xh9zLBYuS2aP0SJYsG4UyM1ArHW9i_w9vIyRhHOOdoRIo7iCowZiuqvGBazzdQ1j0KYcMvjsNfnLTa8jz3HmxiS585LVEFR75_aqX4dPR8anLJEurKnTts3D6396bcnQl-GH72_m-5YV3fjYogOlQedcv0HvcvS3beTC_Y4BwPsaqY9bRvW7BFHG5Vl0qzgh9-YjJ5HOXUQ6iHSO"
                  />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    James Wilson
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Software Architect
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant flex flex-col justify-between">
              <div className="mb-md">
                <div className="flex gap-xs text-primary mb-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      data-icon="star"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface">
                  "Nexus changed how I save. The automated features are a
                  lifesaver for my budget."
                </p>
              </div>
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full overflow-hidden">
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0NmxL3I6ezwG1abtacb_-YC1a_hP2_XCGouiZ8MSnoM6n7PGHLVbI25MkX18XtGQrc5Yhs2c9ZXRWZ14Q6MONKXtyfhti4AyqDssVx6CmPbjT2qTWamz5rax2GAzrxmwQITYbIojLdYGjbCYpo7CidRDEKuOPHPFpiCTKBScLoJqYuu3XPB3yihjxKzI-5wwb_feAtZ_J-AbGU9A7XjzsYCbol5OrAE6ycM7tKUVavqhKtLQ63ukavCQSdTDJmBdJWu5Ng09kfjYe"
                  />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    Sarah Chen
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Marketing Lead
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant flex flex-col justify-between">
              <div className="mb-md">
                <div className="flex gap-xs text-primary mb-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      data-icon="star"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface">
                  "The security features give me absolute peace of mind. Truly a
                  bank for the modern era."
                </p>
              </div>
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full overflow-hidden">
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF4Zyt2txh_xUDnX69ZPLTAsqjXSlkLmpE6Isxf53VZDcAu6IBcaEgqCWnGHa0la_PKAjEcRIn891M4qOjnE2Ko0ODJLVk6599tp0B34WJclfcjTt6N6zqPyahQrImixMWh6C1qSgfjFvOJfRb7yYgU6br0-q5MVExJOH6JufnXrxLlDZJC1IY0wiv2r9agmUrneqemYgcjfKgm_A4i4WakprUVwchGiajqUwzOioDH4-7D77k5WHGiSO8_JKQFmzFT6Fl6ACZm8Yz"
                  />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    Michael Ross
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Investment Consultant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-md px-margin-desktop bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-label-lg text-label-lg font-bold text-on-surface">
              Nexus Bank
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 Nexus Bank. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-md">
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Terms of Service
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Security Disclosure
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              to="#"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
