import React from "react";
import { Switch } from "@material-ui/core";
import { useThemeContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useThemeContext();


  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Switch
        checked={colorMode === "dark"}
        onChange={toggleColorMode}
        color="secondary"
      />
      <FontAwesomeIcon
        icon={colorMode==="dark" ? faMoon : faSun}
        style={{
          position: 'absolute',
          top: '50%',
          left: colorMode==="dark" ? '67%' : '32%',
          transform: 'translate(-50%, -50%) scale(0.9)',
          zIndex: 1,
          pointerEvents:'none',
        }}
      />
    </div>
  );
};
