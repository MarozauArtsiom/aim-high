import "react-image-crop/dist/ReactCrop.css";
import "./image-cropper.css";

import { useState, useCallback, useRef } from "react";
import { Popover, Button } from "@mui/material";
import ReactCrop from "react-image-crop";
import { useCreateObjectUrl } from "../../hooks/image";

const ImageCropper = ({ file, onChange, isOpen, onClose }) => {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const imageRef = useRef(null);

  const imageSrc = useCreateObjectUrl(file);

  const onCropComplete = useCallback(
    (crop) => {
      if (crop.width && crop.height && imageRef.current) {
        const canvas = document.createElement("canvas");
        const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
        const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          imageRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          onChange(blob);
        });
      }
    },
    [onChange]
  );

  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      slotProps={{
        paper: {
          style: { maxWidth: 700, maxHeight: 700 },
        },
      }}
    >
      {imageSrc && (
        <div className="c-image-cropper-container">
          <ReactCrop
            crop={crop}
            ref={imageRef}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          >
            <img
              className="c-image-cropper-container__image"
              src={imageSrc}
            ></img>
          </ReactCrop>
          <Button
            variant="contained"
            onClick={onClose}
            style={{ marginTop: 16 }}
          >
            Done
          </Button>
        </div>
      )}
    </Popover>
  );
};

export default ImageCropper;
