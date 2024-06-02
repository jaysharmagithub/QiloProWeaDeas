import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeSwitcher;
