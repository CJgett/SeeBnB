import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  container: {
      display: "flex",
      flexDirection:"column",
      width:"100%",
      height:"100%"
  }
}));


export const MapAndBottomMenuContainer = ({ children }) => {

  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};
