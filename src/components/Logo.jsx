import { Link } from "react-router";
import logoImage from "../assets/logo.svg";

function Logo({ className = "", imageClassName = "" }) {
  return (
    <Link to="/" className={className} aria-label="Zap Shift home">
      <img className={imageClassName} src={logoImage} alt="Zap Shift" />
    </Link>
  );
}

export default Logo;
