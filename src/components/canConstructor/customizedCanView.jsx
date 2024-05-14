import "./can-view.css";
import Logo from "../logo/logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import { useMemo } from "react";
import CanView from "./canView";

export default function CustomizedCanView({
  logoFile1,
  logoFile2,
  canColor,
  stickerColor,
  backgroundColor,
}) {
  const logo1 = useMemo(() => {
    if (logoFile1) {
      return URL.createObjectURL(logoFile1);
    }
    return null;
  }, [logoFile1]);

  const logo2 = useMemo(() => {
    if (logoFile2) {
      return URL.createObjectURL(logoFile2);
    }
    return null;
  }, [logoFile2]);

  return (
    <div id="can-result">
      <div className="c-can__logo">
        <Logo color={stickerColor} />
      </div>
      <div className="c-can-custom-logo c-can-logo1">
        <img src={logo1} width={50} height={50} />
      </div>
      <div className="c-can-custom-logo c-can-logo2" style={{ left: 50 }}>
        <img src={logo2} width={50} height={50} />
      </div>
      <div style={{ position: "absolute" }}>
        <CanBackLogo color={stickerColor} />
      </div>
      <CanView canColor={canColor} stickerColor={backgroundColor} />
    </div>
  );
}
