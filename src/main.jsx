import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#FFF",
    },
    action: {
      active: "#FFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFF",
          backgroundColor: "#19468D",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
