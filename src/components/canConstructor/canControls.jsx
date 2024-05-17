import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker, ChromePicker as ReactColorPicker } from "react-color";
import { useState, useRef } from "react";
import { Popover, Button } from "@mui/material";
import classNames from "classnames";
import UnderlinedText from "./../underlineText";
import { CAN_COLOR_LABEL_MAP } from "../const";
import { toCanvas } from "html-to-image";
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

  const handleColorChange =
    (onChange) =>
    ({ hex }) =>
      onChange(hex?.toUpperCase());

  return (
    <div>
      <label className="c-color-picker-label" onClick={handleOpenCustomColor}>
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
      <div>
        {isCustomColorAllowed && (
          <div className="c-color-picker__custom-color">
            <Button
              variant="text"
              onClick={handleOpenCustomColor}
              ref={customColorPickerRef}
            >
              <span className="c-color-picker__custom-color-text">
                + Custom color
              </span>
            </Button>
            <Popover
              open={isCustomColorVisible}
              anchorEl={customColorPickerRef.current}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
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

  imageRect1,
  imageRect2,
  onImageRectChange1,
  onImageRectChange2,
}) {
  const [isExportLoading, setIsExportLoading] = useState(false);

  const handleExportClick = async () => {
    setIsExportLoading(true);

    setTimeout(async () => {
      // Create a temporary container for the elements
      const container = document.createElement("div");
      container.style.left = "-9999px"; // Move it far off-screen
      container.style.top = "0";
      container.style.width = "100%"; // Ensure it's large enough to hold all content
      container.style.height = "auto";
      container.style.display = "flex";
      container.style.zIndex = "-100";

      // Append the main canvas div
      const canvas = document.getElementById("can-result").cloneNode(true);
      canvas.style.padding = "0px 0px 70px";
      container.appendChild(canvas);

      const labelContainer = document.createElement("div");
      labelContainer.style.position = "absolute";
      labelContainer.style.top = "55px";
      labelContainer.style.left = "450px";

      // Find and append all color picker labels
      const labels = Array.from(
        document.getElementsByClassName("c-color-picker-label")
      );
      labels.forEach((label) => {
        const clonedLabel = label.cloneNode(true);
        clonedLabel.style.margin = "2px";
        labelContainer.appendChild(clonedLabel);
      });

      container.appendChild(labelContainer);
      container.style.width = "800px";
      container.style.overflow = "hidden";

      // Append the temporary container to the body to be in the document flow
      document.body.appendChild(container);

      try {
        // Use html2canvas or similar to take a snapshot
        const canvas = await toCanvas(container, { scale: 1 });
        const dataUrl = canvas.toDataURL("image/png");
        await download(dataUrl, "aim-high.png");
      } catch (error) {
        console.error("Error capturing the export:", error);
      } finally {
        setIsExportLoading(false);
        // Clean up: remove the temporary container
        document.body.removeChild(container);
      }
    }, 300);
  };

  return (
    <div className="c-can-controls-group">
      <div className="c-upload-group">
        <FileUploadButton
          label="logo 1"
          onFileUpload={onChangeLogo1}
          imageRect={imageRect1}
          onImageRectChange={onImageRectChange1}
        />
        <FileUploadButton
          label="logo 2"
          onFileUpload={onChangeLogo2}
          imageRect={imageRect2}
          onImageRectChange={onImageRectChange2}
        />
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
              "#333333",
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
