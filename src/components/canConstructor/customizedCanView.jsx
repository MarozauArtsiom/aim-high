import "./can-custom-view.css";
import Logo from "../logo/logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import { useCreateObjectUrl } from "../../hooks/image";
import CanView from "./canView";
import BrandLogoMock from "../../assets/brand_logo_mock.svg";

export default function CustomizedCanView({
  logoFile1,
  logoFile2,
  canColor,
  stickerColor,
  backgroundColor,
}) {
  const logo1 = useCreateObjectUrl(logoFile1, BrandLogoMock);

  const logo2 = useCreateObjectUrl(logoFile2, BrandLogoMock);

  return (
    <div className="c-customized-can-view-container">
      <div className="magic-background-light"></div>
      <div className="c-custom-can-view-result" id="can-result">
        <div className="c-custom-can__aim-logo">
          <Logo color={stickerColor} />
        </div>
        <div className="c-custom-can__logo1">
          <img src={logo1} width={83} height={80} />
        </div>
        <div className="c-custom-can__logo2">
          <img src={logo2} width={83} height={80} />
        </div>
        <div className="c-custom-can__target">
          <CanBackLogo color={stickerColor} />
        </div>
        <div id="can-result-view" className="can-result__can-view">
          <CanView canColor={canColor} stickerColor={backgroundColor} />
        </div>
        <div className="c-can-result__can-text" style={{ color: stickerColor }}>
          <div className="c-can-result__water">Water</div>
          <div className="c-can-result__can-volume">19.2 FL OZ (568 ml)</div>
        </div>
      </div>
    </div>
  );
}
