import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker } from "react-color";
import { useState } from "react";
import { Button } from "@mui/material";

const CAN_COLOR_LABEL_MAP = {
  "#FDFDFD": "Silver",
  "#050006": "Black",
  "#FACC15": "Yellow",
};

const circleSize = 24;
const circleSpacing = 8;
const countInRow = 7;

function ColorPicker({ colors, onChange, valueLabel, label, color }) {
  return (
    <div>
      <label>
        <span>{label}</span>
        <span>{valueLabel || color}</span>
      </label>
      <CirclePicker
        className="react-color__circle"
        colors={colors}
        onChangeComplete={onChange}
        circleSize={circleSize}
        width={(circleSize + circleSpacing) * countInRow}
        circleSpacing={circleSpacing}
        color={color}
      />
    </div>
  );
}

export default function CanControls() {
  const [canColor, setCanColor] = useState("#FDFDFD");
  const [stickerColor, setStickerColor] = useState("#FDFDFD");
  const [backgroundColor, setBackgroundColor] = useState("#FDFDFD");

  const handleChangeColor =
    (colorSetter) =>
    ({ hex }) => {
      colorSetter(hex);
    };

  function handleFileUpload() {
    console.log("file uploaded");
  }

  return (
    <div className="c-can-controls-group">
      <div className="c-upload-group">
        <FileUploadButton label="logo 1" onFileUpload={handleFileUpload} />
        <FileUploadButton label="logo 2" onFileUpload={handleFileUpload} />
      </div>
      <div className="c-color-picker-group">
        <div>
          <ColorPicker
            colors={["#FDFDFD", "#050006", "#FACC15"]}
            onChange={handleChangeColor(setCanColor)}
            label="CAN COLOR"
            valueLabel={CAN_COLOR_LABEL_MAP[canColor]}
            color={canColor}
          />
        </div>
        <div>
          <ColorPicker
            colors={[
              "#FDFDFD",
              "#EF4444",
              "#F97316",
              "#FACC15",
              "#4ADE80",
              "#2DD4BF",
              "#3B82F6",
              "#050006",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={handleChangeColor(setStickerColor)}
            label="sticker color"
            color={stickerColor}
            isCustomAllowed={true}
          />
        </div>
        <div>
          <ColorPicker
            colors={[
              "#FDFDFD",
              "#EF4444",
              "#F97316",
              "#FACC15",
              "#4ADE80",
              "#2DD4BF",
              "#3B82F6",
              "#050006",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={handleChangeColor(setBackgroundColor)}
            label="BACKGROUND COLOR"
            color={backgroundColor}
            isCustomAllowed={true}
          />
        </div>
      </div>
      <Button variant="contained" color="primary" fullWidth={false}>
        Download Mock up
      </Button>
    </div>
  );
}
