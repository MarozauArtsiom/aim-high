import "./can-custom-view.css";
import CanAimLogo from "./can-aim-logo/can-aim-logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import CanView from "./canView";
import ImageCropper from "../imageCropper/imageCropper";
import { useState, useRef } from "react";
import CustomLogo from "../customLogo/customLogo";

export default function CustomizedCanView({
  logoFile1,
  logoFile2,

  setLogoFile1,
  setLogoFile2,

  imageRect1,
  imageRect2,

  onImageRectChange1,
  onImageRectChange2,

  canColor,
  stickerColor,
  backgroundColor,
  aimHighLogoColor,

  isWaterLayerVisible,
}) {
  const canContainerRef = useRef(null);

  const [imageCroperProps, setImageCroperProps] = useState({
    isOpen: false,
  });

  return (
    <>
      <ImageCropper
        anchorEl={canContainerRef.current}
        isOpen={imageCroperProps.isOpen}
        onChange={imageCroperProps.onChange}
        file={imageCroperProps.file}
        onClose={() => {
          setImageCroperProps({ isOpen: false });
        }}
        imageRect={imageCroperProps.imageRect}
        onImageRectChange={imageCroperProps.onImageRectChange}
      />
      <div className="c-customized-can-view-container" ref={canContainerRef}>
        <div className="magic-background-light"></div>
        <div className="c-custom-can-view-result" id="can-result">
          <div className="c-custom-can__aim-logo">
            <CanAimLogo color={aimHighLogoColor} />
          </div>
          <CustomLogo
            className="c-custom-can__logo1"
            file={logoFile1}
            setFile={setLogoFile1}
            setImageCroperProps={setImageCroperProps}
            onImageRectChange={onImageRectChange1}
            imageRect={imageRect1}
          />
          <CustomLogo
            className="c-custom-can__logo2"
            file={logoFile2}
            setFile={setLogoFile2}
            setImageCroperProps={setImageCroperProps}
            onImageRectChange={onImageRectChange2}
            imageRect={imageRect2}
          />
          <div className="c-custom-can__target">
            <CanBackLogo color={stickerColor} />
          </div>
          <div id="can-result-view" className="can-result__can-view">
            <CanView
              canColor={canColor}
              stickerColor={backgroundColor}
              isWaterLayerVisible={isWaterLayerVisible}
            />
          </div>
          <div
            className="c-can-result__can-text"
            style={{ color: stickerColor }}
          >
            <div className="c-can-result__water">Water</div>
            <div className="c-can-result__can-volume">19.2 FL OZ (568 ml)</div>
          </div>
        </div>
      </div>
    </>
  );
}
