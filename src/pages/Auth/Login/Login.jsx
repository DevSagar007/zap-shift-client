import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import authImage from "../../../../public/assets/authImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "@/components/Logo";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

export default function LoginPage() {
  // call useAuth
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const redirectPath = from
    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
    : "/";

  const [formData, setFormData] = useState({
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

    console.log("Login Data:", formData);
    signInUser(formData.email, formData.password)
      .then(() => {
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Login Content */}
        <section className="flex flex-col justify-between px-6 py-6 sm:px-10 lg:px-12">
          <div className="max-w-xl">
            {/* Logo */}
            <Link>
              <Logo></Logo>
            </Link>
            {/* Login Form */}
            <div className="mt-20 max-w-md sm:mt-24 lg:mt-28 lg:pl-8">
              <div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                  Welcome Back
                </h1>

                <p className="mt-3 text-base text-muted-foreground">
                  Login with ZapShift
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

                {/* Forget Password */}
                <a
                  href="/forgot-password"
                  className="inline-block text-sm text-muted-foreground underline decoration-muted-foreground underline-offset-2 transition-colors hover:text-foreground"
                >
                  Forgot password?
                </a>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="h-10 w-full bg-lime-300 font-semibold text-slate-900 hover:bg-lime-400"
                >
                  Login
                </Button>
              </form>

              {/* Register */}
              <p className="mt-4 text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  state={location?.state}
                  to="/register"
                  className="font-medium text-lime-700 transition-colors hover:text-lime-800"
                >
                  Register
                </Link>
              </p>

              {/* Divider */}
              <div className="mt-4 flex items-center gap-3">
                <Separator className="flex-1" />

                <span className="text-sm text-muted-foreground">Or</span>

                <Separator className="flex-1" />
              </div>

              {/* Google Login */}
              <SocialLogin></SocialLogin>
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
    </main>
  );
}

