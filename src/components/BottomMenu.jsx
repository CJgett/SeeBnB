import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Divider } from "@material-ui/core";
import { MenuHeader } from "./MenuHeader";
import { MenuMetrics } from "./MenuMetrics";

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowX: "auto",
    flex: "0 0 250px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alginItems: "flex-start",
    zIndex: 100
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const BottomMenu = ({
}) => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.wrapper }}>
      <MenuHeader />
    </Paper>
  );
};
