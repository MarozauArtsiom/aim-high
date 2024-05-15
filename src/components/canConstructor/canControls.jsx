import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker, PhotoshopPicker as ReactColorPicker } from "react-color";
import { useState, useEffect } from "react";
import { Button, Popover } from "@mui/material";
import classNames from "classnames";
import UnderlinedText from "./../underlineText";
import { CAN_COLOR_LABEL_MAP } from "../const";

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
  const [colorValueBeforeOpen, setColorValueBeforeOpen] = useState(color);

  function handleOpenCustomColor() {
    setIsCustomColorVisible(true);
    setColorValueBeforeOpen(color);
  }

  function handleCloseCustomColor() {
    setIsCustomColorVisible(false);
    if (colorValueBeforeOpen !== color) {
      onChange({ hex: colorValueBeforeOpen });
    }
  }

  function handleAcceptCustomColor() {
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
              horizontal: "right",
            }}
            onClose={handleCloseCustomColor}
          >
            <ReactColorPicker
              color={color}
              onChange={onChange}
              disableAlpha={true}
              onAccept={handleAcceptCustomColor}
              onCancel={handleCloseCustomColor}
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

  return (
    <div className="c-can-controls-group">
      <div className="c-upload-group">
        <FileUploadButton label="logo 1" onFileUpload={onChangeLogo1} />
        <FileUploadButton label="logo 2" onFileUpload={onChangeLogo2} />
      </div>
      <div className="c-color-picker-group">
        <div>
          <ColorPicker
            colors={["#FDFDFD", "#050006", "#FACC15"]}
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
              "#050006",
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
              "#050006",
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
      <Button
        variant="contained"
        color="primary"
        fullWidth={false}
        style={{ width: 205 }}
      >
        Download Mock up
      </Button>
    </div>
  );
}
