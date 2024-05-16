import React, { useState, useEffect, useCallback, useRef } from "react";
import { Popover, Button } from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ file, onChange, isOpen, onClose }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const imageRef = useRef(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  }, [file]);

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
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {imageSrc && (
        <div style={{ padding: 16 }}>
          <ReactCrop
            src={imageSrc}
            crop={crop}
            ref={imageRef}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          />
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
