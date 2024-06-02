import { createTheme, CssBaseline } from "@mui/material";
import React, { createContext, useState, useMemo } from "react";
import { Children } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#ECF3F9",
                  paper: "#F8F8FF",
                },

                text: {
                  primary: "#000",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#FF033E",
                },
                text: {
                  primary: "#fff",
                },
              }),
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, CustomThemeProvider };
