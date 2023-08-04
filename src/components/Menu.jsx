import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Divider } from "@material-ui/core";
import { MenuHeader } from "./MenuHeader";
import { MenuSolverControls } from "./MenuSolverControls";
import { MenuMetrics } from "./MenuMetrics";
import { MenuPointControls } from "./MenuPointControls";
import { MenuRunControls } from "./MenuRunControls";

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: "auto",
    flex: "0 0 400px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alginItems: "flex-start",
    zIndex: 100
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const Menu = ({
  onStep,
  onStart,
  onPause,
  onUnPause,
  onFullSpeed,
  onStop,
  onRandomizePoints
}) => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.wrapper }}>
      <MenuHeader />
      <Divider />
      <MenuMetrics />
      <MenuSolverControls
        onStep={onStep}
        onStart={onStart}
        onPause={onPause}
        onUnPause={onUnPause}
        onStop={onStop}
        onFullSpeed={onFullSpeed}
      />
      <MenuRunControls />
      <Divider />
      <MenuPointControls onRandomizePoints={onRandomizePoints} />
    </Paper>
  );
};
