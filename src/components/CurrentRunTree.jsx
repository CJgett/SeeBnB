import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    flex: 1
}));

export const CurrentRunTree = props => {
  const classes = useStyles();

  return (
    <MenuSection>
      <MenuItem title="Current Run" row>
        <Grid item container justify="space-between">
          <Typography
            display="inline"
            variant="button"
            component="div"
          >
            initial solution
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            variant="button"
          >
            &rarr;
          </Typography>
          <Typography
            classes={{ root: classes.unit }}
            align="right"
            display="inline"
            variant="button"
          >
            search strategy
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            variant="button"
          >
            &rarr;
          </Typography>
          <Typography
            classes={{ root: classes.unit }}
            align="right"
            display="inline"
            variant="button"
          >
           bounding strategy 
          </Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  );
};
