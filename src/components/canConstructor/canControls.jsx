import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker, ChromePicker as ReactColorPicker } from "react-color";
import { useState, useEffect } from "react";
import { Popover, Button } from "@mui/material";
import classNames from "classnames";
import UnderlinedText from "./../underlineText";
import { CAN_COLOR_LABEL_MAP } from "../const";
import { toPng } from "html-to-image";
import download from "downloadjs";
import LoadingButton from "@mui/lab/LoadingButton";

const circleSize = 24;
const circleSpacing = 8;
const countInRow = 7;

function ColorPicker({
  colors,
  onChange,
  valueLabel,
  label,
  color,
  isCustomColorAllowed,
}) {
  const [isCustomColorVisible, setIsCustomColorVisible] = useState(false);

  function handleOpenCustomColor() {
    setIsCustomColorVisible(true);
  }

  function handleCloseCustomColor() {
    setIsCustomColorVisible(false);
  }

  return (
    <div>
      <label className="c-color-picker-label">
        <span className="c-color-picker-label__label">{label}</span>
        <UnderlinedText
          className={classNames("c-color-picker-label__color", {
            "m-upper-case": !valueLabel,
          })}
          color={color}
          thickness={2}
          gap={0.5}
        >
          {valueLabel || color}
        </UnderlinedText>
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
      {isCustomColorAllowed && (
        <div className="c-color-picker__custom-color">
          <Button variant="text" onClick={handleOpenCustomColor}>
            <span className="c-color-picker__custom-color-text">
              + Custom color
            </span>
          </Button>
          <Popover
            open={isCustomColorVisible}
            anchorOrigin={{
              vertical: 100500,
              horizontal: 1400,
            }}
            onClose={handleCloseCustomColor}
          >
            <ReactColorPicker
              color={color}
              onChange={onChange}
              disableAlpha={true}
            />
          </Popover>
        </div>
      )}
    </div>
  );
}

export default function CanControls({
  onChangeLogo1,
  onChangeLogo2,
  onChangeCanColor,
  onChangeStickerColor,
  onChangeBackgroundColor,
}) {
  const [canColor, setCanColor] = useState("#FDFDFD");
  const [stickerColor, setStickerColor] = useState("#FDFDFD");
  const [backgroundColor, setBackgroundColor] = useState("#FDFDFD");

  const [isExportLoading, setIsExportLoading] = useState(false);

  useEffect(() => {
    onChangeCanColor("#FDFDFD");
    onChangeStickerColor("#FDFDFD");
    onChangeBackgroundColor("#FDFDFD");
  }, []);

  const handleChangeColor =
    (...subscribers) =>
    ({ hex }) => {
      const color = hex?.toUpperCase();
      subscribers.forEach((subscriber) => subscriber(color));
    };

  const handleExportClick = async () => {
    setIsExportLoading(true);
    try {
      const canvas = document.getElementById("can-result-view");
      const dataUrl = await toPng(canvas);
      await download(dataUrl, "aim-high.png");
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="c-can-controls-group">
      <div className="c-upload-group">
        <FileUploadButton label="logo 1" onFileUpload={onChangeLogo1} />
        <FileUploadButton label="logo 2" onFileUpload={onChangeLogo2} />
      </div>
      <div className="c-color-picker-group">
        <div>
          <ColorPicker
            colors={["#FDFDFD", "#0C0C0C", "#FACC15"]}
            onChange={handleChangeColor(setCanColor, onChangeCanColor)}
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
              "#0C0C0C",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={handleChangeColor(setStickerColor, onChangeStickerColor)}
            label="sticker color"
            color={stickerColor}
            isCustomColorAllowed={true}
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
              "#0C0C0C",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={handleChangeColor(
              setBackgroundColor,
              onChangeBackgroundColor
            )}
            label="BACKGROUND COLOR"
            color={backgroundColor}
            isCustomColorAllowed={true}
          />
        </div>
      </div>
      <LoadingButton
        variant="contained"
        color="primary"
        fullWidth={false}
        style={{ width: 205, height: 40 }}
        onClick={handleExportClick}
        loading={isExportLoading}
        disabled={isExportLoading}
      >
        Download Mock up
      </LoadingButton>
    </div>
  );
}
