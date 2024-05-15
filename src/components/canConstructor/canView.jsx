import "./canView.css";
import CanBackground from "./canBackground";
import { CAN_COLOR_LABEL_MAP } from "./../const";
import shadowsImage from "../../assets/images/soda/shadows.png";

import edgeBlack from "../../assets/images/soda/can_top_bottom_black.png";

const canEdgesImage = {
  Yellow: edgeBlack,
};

export default function CanView({ canColor, stickerColor }) {
  const canColorName = CAN_COLOR_LABEL_MAP[canColor];
  return (
    <div className="soda-container">
      <img
        src={canEdgesImage[canColorName]}
        alt="Soda Shadows"
        className="soda-layer"
      />
      <CanBackground color={stickerColor} className="soda-layer label-color" />
      <img src={shadowsImage} alt="Soda Shadows" className="shadows-layer" />
    </div>
  );
}
