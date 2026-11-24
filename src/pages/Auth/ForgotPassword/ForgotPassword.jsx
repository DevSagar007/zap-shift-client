import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import useAuth from "../../../hooks/useAuth";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setMessage("Password reset instructions have been sent to your email.");
    } catch (error) {
      const messages = {
        "auth/user-not-found": "No account was found with this email.",
        "auth/invalid-email": "Please enter a valid email address.",
      };
      setErrorMessage(messages[error.code] || "Unable to send the reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <section className="w-full max-w-md">
        <Logo />
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black">Reset your password</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Enter your account email and Firebase will send you a secure password reset link.
          </p>

          {message && <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
          {errorMessage && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="reset-email">Email</Label>
              <Input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="h-10 w-full bg-lime-300 font-semibold text-slate-900 hover:bg-lime-400">
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <Link to="/login" className="mt-5 block text-center text-sm font-medium text-lime-700 hover:text-lime-800">
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
