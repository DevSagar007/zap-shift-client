import logoImage from "../assets/logo.svg";

function Logo({ className = "", imageClassName = "" }) {
  return (
    <div className={className}>
      <img className={imageClassName} src={logoImage} alt="Logo" />
    </div>
  );
}

export default Logo;
