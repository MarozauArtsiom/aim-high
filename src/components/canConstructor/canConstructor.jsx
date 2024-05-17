import "./can-constructor.css";
import CustomizedCanView from "./customizedCanView.jsx";
import CanControls from "./canControls.jsx";
import { useState } from "react";
import { Grid, Container, Box } from "@mui/material";

export default function CanConstructor() {
  const [logoFile1, setLogo1] = useState(null);
  const [logoFile2, setLogo2] = useState(null);
  const [canColor, setCanColor] = useState("#FDFDFD");
  const [stickerColor, setStickerColor] = useState("#0C0C0C");
  const [backgroundColor, setBackgroundColor] = useState("#FDFDFD");

  return (
    <Box md={{ mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={12} md={6}>
            <CustomizedCanView
              logoFile1={logoFile1}
              logoFile2={logoFile2}
              canColor={canColor}
              stickerColor={stickerColor}
              backgroundColor={backgroundColor}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <CanControls
              onChangeLogo1={setLogo1}
              onChangeLogo2={setLogo2}
              onChangeCanColor={setCanColor}
              onChangeStickerColor={setStickerColor}
              onChangeBackgroundColor={setBackgroundColor}
              canColor={canColor}
              stickerColor={stickerColor}
              backgroundColor={backgroundColor}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
