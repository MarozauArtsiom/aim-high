import "./can-constructor.css";
import CustomizedCanView from "./customizedCanView.jsx";
import CanControls from "./canControls.jsx";
import { useState } from "react";

export default function CanConstructor() {
  const [logoFile1, setLogo1] = useState(null);
  const [logoFile2, setLogo2] = useState(null);
  const [canColor, setCanColor] = useState("#FDFDFD");
  const [stickerColor, setStickerColor] = useState("#FDFDFD");
  const [backgroundColor, setBackgroundColor] = useState("#FDFDFD");

  return (
    <div className="c-can-constructor">
      <CustomizedCanView
        logoFile1={logoFile1}
        logoFile2={logoFile2}
        canColor={canColor}
        stickerColor={stickerColor}
        backgroundColor={backgroundColor}
      />
      <CanControls
        onChangeLogo1={setLogo1}
        onChangeLogo2={setLogo2}
        onChangeCanColor={setCanColor}
        onChangeStickerColor={setStickerColor}
        onChangeBackgroundColor={setBackgroundColor}
      />
    </div>
  );
}
