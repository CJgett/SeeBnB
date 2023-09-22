import React, {useRef, useLayoutEffect} from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@material-ui/core";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { NodeTree } from "./NodeTree";
import { makeStyles } from "@material-ui/styles";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display:"flex",
    justifyContent:"space-between"
  },
  button: {
    marginTop: "-3px"
  }
}));

export const CurrentRun = props => {

  const classes = useStyles();
  const numNodes = useSelector(selectors.selectNumNodesExplored);
  const running = useSelector(selectors.selectRunning);
  const runningBranchAndBound = useSelector(selectors.selectAlgorithmStage);
  const bnbNodeTree = useSelector(selectors.selectTree);
  const ref = useRef(null);
  const refBnB = useRef(null);
  const dispatch = useDispatch();

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

  let componentToRender;

  if (Object.keys(bnbNodeTree).length === 0) {
    componentToRender = (
      <Typography
        align="center"
        display="inline"
        variant="subtitle2"
        color="textSecondary"
      >
      Start the Branch and Bound algorithm to build the node tree. 
      </Typography>
    );
  } else {
    componentToRender = <NodeTree /> 
  }

  let showWarningIfLotsOfNodes;

  if (numNodes > 1000) {
    showWarningIfLotsOfNodes = (<Typography 
            align="center" 
            display="inline"
            variant="subtitle2" 
            color="textSecondary">
            Stopped rendering tree: too many nodes! 
        </Typography>);
  }

  function onEnlarge() {
    dispatch(actions.toggleExpandedTreeOpen());
  }
 
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
        <div className={ classes.wrapper }>
        <Typography 
            variant="subtitle2" 
            color="textSecondary">
            Number of nodes explored: {numNodes}
        </Typography>
        <Tooltip title="Enlarge Tree">
          <Button className={ classes.button } onClick={onEnlarge} disabled={running}>
            <FontAwesomeIcon icon={faExpand} width="0" />
          </Button>
         </Tooltip>
        </div>
        {componentToRender} 
        {showWarningIfLotsOfNodes}
      </MenuSection>
    </div>
  );
};
