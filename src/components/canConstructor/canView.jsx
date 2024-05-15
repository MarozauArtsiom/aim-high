import "./canView.css";
import sodaHighlightsLayer from "./../../assets/images/soda/highlights.png";
import sodaShadowsLayer from "./../../assets/images/soda/shadows.png";
import sodaLabelColorLayer from "./../../assets/images/soda/label_color.png";

export default function CanView({ canColor, stickerColor }) {
  // console.log(`style={{ filter: \`hue-rotate(${stickerColor}deg)\` }}`);
  console.log(canColor);
  return (
    <div className="soda-editor">
      <div className="soda-container">
        <img
          src={sodaHighlightsLayer}
          alt="Soda Highlight"
          className="soda-layer"
        />
        <img src={sodaShadowsLayer} alt="Soda Shadows" className="soda-layer" />
        <div
          className="soda-layer label-color"
          style={{ backgroundColor: stickerColor }}
        />
      </div>
    </div>
  );
}
