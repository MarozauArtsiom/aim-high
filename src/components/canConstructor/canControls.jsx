import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker, ChromePicker as ReactColorPicker } from "react-color";
import { useState, useRef } from "react";
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
  const customColorPickerRef = useRef(null);
  const [isCustomColorVisible, setIsCustomColorVisible] = useState(false);

  function handleOpenCustomColor() {
    setIsCustomColorVisible(true);
  }

  function handleCloseCustomColor() {
    setIsCustomColorVisible(false);
  }

  const { x: customPopoverX, y: customPopoverY } =
    customColorPickerRef.current?.getBoundingClientRect?.() || {
      x: 1400,
      y: 100500,
    };

  const handleColorChange =
    (onChange) =>
    ({ hex }) =>
      onChange(hex?.toUpperCase());

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
        onChangeComplete={handleColorChange(onChange)}
        circleSize={circleSize}
        width={(circleSize + circleSpacing) * countInRow}
        circleSpacing={circleSpacing}
        color={color}
      />
      <div ref={customColorPickerRef}>
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
                vertical: customPopoverX,
                horizontal: customPopoverY,
              }}
              onClose={handleCloseCustomColor}
            >
              <ReactColorPicker
                color={color}
                onChange={handleColorChange(onChange)}
                disableAlpha={true}
              />
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CanControls({
  onChangeLogo1,
  onChangeLogo2,
  onChangeCanColor,
  onChangeStickerColor,
  onChangeBackgroundColor,

  canColor,
  stickerColor,
  backgroundColor,
}) {
  const [isExportLoading, setIsExportLoading] = useState(false);

  const handleExportClick = async () => {
    setIsExportLoading(true);
    const canvas = document.getElementById("can-result");
    try {
      canvas.classList.add("print");
      const dataUrl = await toPng(canvas);
      await download(dataUrl, "aim-high.png");
    } finally {
      setIsExportLoading(false);
      canvas.classList.remove("print");
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
            onChange={onChangeCanColor}
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
            onChange={onChangeStickerColor}
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
            onChange={onChangeBackgroundColor}
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
