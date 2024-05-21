import "./can-custom-view.css";
import CanAimLogo from "./can-aim-logo/can-aim-logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import { useCreateObjectUrl } from "../../hooks/image";
import CanView from "./canView";
import BrandLogoMock from "../../assets/brand_logo_mock.svg";
import ImageCropper from "../imageCropper/imageCropper";
import { useState, useRef } from "react";

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
  const logo1 = useCreateObjectUrl(logoFile1, BrandLogoMock);
  const logo2 = useCreateObjectUrl(logoFile2, BrandLogoMock);

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
          <button
            className="c-custom-can__logo1 button-reset"
            disabled={!logoFile1}
            onClick={() =>
              setImageCroperProps({
                isOpen: true,
                file: logoFile1,
                onChange: setLogoFile1,
                crop: logoFile1,
                imageRect: imageRect1,
                onImageRectChange: (val) => {
                  setImageCroperProps((crop) => ({ ...crop, imageRect: val }));
                  onImageRectChange1(val);
                },
              })
            }
          >
            <img
              src={logo1}
              width={imageRect1.width}
              height={imageRect1.height}
              style={{
                transform: `translate(${imageRect1.x}px, ${
                  0 - imageRect1.y
                }px)`,
              }}
            />
          </button>
          <button
            className="c-custom-can__logo2 button-reset"
            disabled={!logoFile2}
            onClick={() =>
              setImageCroperProps({
                isOpen: true,
                file: logoFile2,
                onChange: setLogoFile2,
                crop: logoFile2,
                imageRect: imageRect2,
                onImageRectChange: (val) => {
                  setImageCroperProps((crop) => ({ ...crop, imageRect: val }));
                  onImageRectChange2(val);
                },
              })
            }
          >
            <img
              src={logo2}
              width={imageRect2.width}
              height={imageRect2.height}
              style={{
                transform: `translate(${imageRect2.x}px, ${
                  0 - imageRect2.y
                }px)`,
              }}
            />
          </button>
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
