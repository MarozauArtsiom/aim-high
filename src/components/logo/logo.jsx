import Logo from "../../assets/logo.svg";

export default function LogoComponent() {
  return (
    <div
      style={{
        "z-index": -1,
        "pointer-events": "none",
      }}
    >
      <img src={Logo} alt="AIM High Logo" />
    </div>
  );
}
