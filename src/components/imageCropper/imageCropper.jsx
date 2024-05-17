import "react-image-crop/dist/ReactCrop.css";
import "./image-cropper.css";

import { useState, useCallback, useRef } from "react";
import { Popover, Box } from "@mui/material";
import ReactCrop from "react-image-crop";
import { useCreateObjectUrl } from "../../hooks/image";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ImageCropper = ({ file, onChange, isOpen, onClose }) => {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const imageRef = useRef(null);

  const imageSrc = useCreateObjectUrl(file);

  const onCropComplete = useCallback(
    (crop) => {
      if (!crop.width || !crop.height || !imageRef.current) {
        return;
      }

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
        blob.name = file?.name;
        onChange(blob);
      });
    },
    [onChange, onClose]
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
      PaperProps={{
        style: { maxWidth: 700, maxHeight: 700, padding: 20 },
      }}
    >
      {imageSrc && (
        <div className="c-image-cropper-container">
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onCropComplete={onCropComplete}
          >
            <img
              ref={imageRef}
              alt="Crop me"
              src={imageSrc}
              className="c-image-cropper-container__image"
            />
          </ReactCrop>
        </div>
      )}
    </Popover>
  );
};

export default ImageCropper;
