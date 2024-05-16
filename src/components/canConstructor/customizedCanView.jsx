import "./can-custom-view.css";
import Logo from "../logo/logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import { useMemo } from "react";
import CanView from "./canView";

function useCreateObjectUrl(file) {
  return useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);
}

export default function CustomizedCanView({
  logoFile1,
  logoFile2,
  canColor,
  stickerColor,
  backgroundColor,
}) {
  const logo1 = useCreateObjectUrl(logoFile1);

  const logo2 = useCreateObjectUrl(logoFile2);

  return (
    <div className="c-custom-can-view-result" id="can-result">
      <div className="c-custom-can__aim-logo">
        <Logo color={stickerColor} />
      </div>
      {logo1 && (
        <div className="c-custom-can__logo1">
          <img src={logo1} width={50} height={50} />
        </div>
      )}
      {logo2 && (
        <div className="c-custom-can__logo2" style={{ left: 50 }}>
          <img src={logo2} width={50} height={50} />
        </div>
      )}
      <div className="c-custom-can__target">
        <CanBackLogo color={stickerColor} />
      </div>
      <div className="magic-background-light"></div>
      <CanView canColor={canColor} stickerColor={backgroundColor} />
    </div>
  );
}
