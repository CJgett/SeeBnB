import React, {useRef, useLayoutEffect} from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { NodeTree } from "./NodeTree";
import { makeStyles } from "@material-ui/styles";
import * as selectors from "../store/selectors";

export const CurrentRun = props => {

  const runningBranchAndBound = useSelector(selectors.selectAlgorithmStage);
  const ref = useRef(null);
  const refBnB = useRef(null);

  var underlineInitialSolution = runningBranchAndBound ? "none" : "underline";
  var underlineBnB = runningBranchAndBound ? "underline" : "none";

  // Used to show what algo will run next / is currently running. 
  // This can't be set directly in the Typography component
  // because it needs to override its parent text-decoration attribute,
  // which is done by adding important (can't be done normally with React...)
  useLayoutEffect(() => {
    ref.current.style.setProperty("text-decoration", `${underlineInitialSolution}`, "important");
    refBnB.current.style.setProperty("text-decoration", `${underlineBnB}`, "important");
  }, [runningBranchAndBound]);

  return (
    <div>
      <MenuSection>
        <MenuItem title="Current Run" row>
          <Grid item container justifyContent="space-around">
            <Typography
              ref={ref}
              display="inline"
              variant="button"
              component="div"
              paddingbottom="3px"
            >
              initial solution
            </Typography>
            <Typography
              align="right"
              display="inline"
              variant="button"
            >
              &rarr;
            </Typography>
            <Typography
              ref={refBnB}
              align="right"
              display="inline"
              variant="button"
            >
             Branch and Bound 
            </Typography>
          </Grid>
        </MenuItem>
        <NodeTree />
      </MenuSection>
    </div>
  );
};
