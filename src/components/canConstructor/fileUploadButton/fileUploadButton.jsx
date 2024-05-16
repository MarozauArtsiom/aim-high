import { useState, useId } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import "./file-upload-button.css";
import ImageCropper from "../../imageCropper/imageCropper";

const BASE_ELEMENT_HEIGHT = 48;

function FileUpload({ label, onFileUpload }) {
  const [file, setFile] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      onFileUpload?.(file);
      setIsCropperOpen(true);
    }
  };

  const handleImageCropped = (blob) => {
    setFile(blob);
    onFileUpload?.(blob);
    setIsCropperOpen(false);
  };

  const clearFile = (e) => {
    setFile(null);
    e.stopPropagation();
    onFileUpload?.(null);
  };

  const fileUploadInputId = useId();

  const handleLoadFile = () => {
    document.getElementById(fileUploadInputId).click();
  };

  return (
    <div className="c-file-upload">
      <label className="c-file-upload__label" htmlFor="file-upload">
        {label}
      </label>
      <TextField
        variant="outlined"
        value={file?.name || ""}
        onClick={handleLoadFile}
        InputProps={{
          endAdornment: file && (
            <InputAdornment position="end">
              <IconButton onClick={clearFile}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { height: `${BASE_ELEMENT_HEIGHT}px` },
        }}
        fullWidth={false}
        style={{ width: 232 }}
      />
      <input
        type="file"
        accept="image/*"
        id={fileUploadInputId}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        onClick={handleLoadFile}
        sx={{ mt: 0 }}
        style={{ height: BASE_ELEMENT_HEIGHT }}
      >
        Select File
      </Button>
      {/* <ImageCropper
        file={file}
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        onChange={handleImageCropped}
      /> */}
    </div>
  );
}

export default FileUpload;
