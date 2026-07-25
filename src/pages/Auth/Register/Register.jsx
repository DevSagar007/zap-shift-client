import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import authImage from "../../../../public/assets/authImage.png";
import { useState } from "react";
import Logo from "@/components/Logo";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

function Register() {
  // call useAuth
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("register Data:", formData);
    registerUser(formData.email, formData.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="min-h-screen bg-background text-foreground">
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Login Content */}
          <section className="flex flex-col justify-between px-6 py-6 sm:px-10 lg:px-12">
            <div className="max-w-xl">
              {/* Logo */}
              <Link to="/">
                <Logo />
              </Link>
              {/* Login Form */}
              <div className="mt-20 max-w-md sm:mt-24 lg:mt-28 lg:pl-8">
                <div>
                  <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                    Create an Account
                  </h1>

                  <p className="mt-3 text-base text-muted-foreground">
                    Register with ZapShift
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {/* Name */}
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Name</Label>

                    <Input
                      id="name"
                      name="name"
                      type="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="NAME"
                      autoComplete="name"
                      required
                      className="h-10 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                    />
                  </div>

                  {/* Email */}
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Email</Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      autoComplete="email"
                      required
                      className="h-10 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-1.5">
                    <Label htmlFor="password">Password</Label>

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="current-password"
                      required
                      className="h-10 focus-visible:border-lime-400 focus-visible:ring-lime-200/70"
                    />
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="h-10 w-full bg-lime-300 font-semibold text-slate-900 hover:bg-lime-400"
                  >
                    Register
                  </Button>
                </form>

                {/* Register */}
                <p className="mt-4 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-lime-700 transition-colors hover:text-lime-800"
                  >
                    Login
                  </a>
                </p>

                {/* Divider */}
                <div className="mt-4 flex items-center gap-3">
                  <Separator className="flex-1" />

                  <span className="text-sm text-muted-foreground">Or</span>

                  <Separator className="flex-1" />
                </div>

                {/* Google Login */}
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4 h-10 w-full gap-2"
                >
                  <GoogleIcon />
                  Login with Google
                </Button>
              </div>
            </div>
          </section>

          {/* Right Image */}
          <section className="relative hidden overflow-hidden bg-[#f7f9e8] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_60%)]" />

            <div className="relative flex h-full items-center justify-center p-8">
              <div className="w-full max-w-[640px]">
                <img
                  src={authImage}
                  alt="ZapShift authentication illustration"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.39a4.61 4.61 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.97-4.33 2.97-7.39Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.38l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.61A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.93A6.01 6.01 0 0 1 6.1 12c0-.67.11-1.32.31-1.93V7.46H3.06A10 10 0 0 0 2 12c0 1.61.39 3.13 1.06 4.54l3.35-2.61Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.46l3.35 2.61C7.2 7.71 9.4 5.95 12 5.95Z"
      />
    </svg>
  );
}
