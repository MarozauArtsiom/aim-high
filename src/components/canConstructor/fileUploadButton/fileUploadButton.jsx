import { useState, useId } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import "./file-upload-button.css";

const BASE_ELEMENT_HEIGHT = 48;

function FileUpload({ label }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  const clearFile = (e) => {
    setFile(null);
    setFileName("");
    e.stopPropagation();
  };

  const fileUploadInputId = useId();

  return (
    <div className="c-file-upload">
      <label className="c-file-upload__label" htmlFor="file-upload">
        {label}
      </label>
      <TextField
        variant="outlined"
        value={fileName}
        onClick={() => document.getElementById(fileUploadInputId).click()}
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
        id={fileUploadInputId}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        // startIcon={<FileUploadIcon />}
        onClick={() => document.getElementById(fileUploadInputId).click()}
        sx={{ mt: 2, mt: 0 }}
        style={{ height: BASE_ELEMENT_HEIGHT }}
      >
        Select File
      </Button>
    </div>
  );
}

export default FileUpload;
