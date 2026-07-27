import { Button } from "@/components/ui/button";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const redirectPath = from
    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
    : "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(() => {
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        onClick={handleGoogleSignIn}
        type="button"
        variant="secondary"
        className="mt-4 h-10 w-full gap-2"
      >
        <GoogleIcon />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;

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
