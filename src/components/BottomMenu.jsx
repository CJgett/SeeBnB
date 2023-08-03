import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Divider } from "@material-ui/core";
import { CurrentRunTree } from "./CurrentRunTree";
import { SavedRuns } from "./SavedRuns";

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: "scroll",
    flex: "0 0 250px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    zIndex: 100,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const BottomMenu = () => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.wrapper }} >
      <CurrentRunTree />
      <Divider orientation='vertical' />
      <SavedRuns />
    </Paper>
  );
};
