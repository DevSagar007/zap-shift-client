import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import authImage from "../../../../public/assets/authImage.png";
import { useState } from "react";
import Logo from "@/components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function Register() {
  // call useAuth
  const { registerUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from;
  const redirectPath = from
    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
    : "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(formData.email, formData.password);
      const token = await result.user.getIdToken();

      const userInfo = {
        name: formData.name,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/users", userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
      </div>
    </div>
  );
}

export default Register;
