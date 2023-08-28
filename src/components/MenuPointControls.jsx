import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ButtonGroup,
  Button,
  Slider,
  Select,
  MenuItem as SelectItem,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  faRandom,
  faSave,
  faMousePointer,
  faMapMarked,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

// calculate number of possible paths [0, 1/2, 1, 3, 12] 
let cache = ["1e+0", "1e+0"];
const possRoutes = n => {
  if (n <= 2) {
    return "1e+0";
  }
  if (typeof cache[n - 1] !== "undefined") {
    return cache[n - 1];
  }

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
    cache[i] = (result / 2).toExponential(3);
  }

  return cache[n - 1];
};

 

export const MenuPointControls = ({ onRandomizePoints }) => {
  const classes = useStyles();
  const [possiblePaths, setPossiblePaths] = useState("0");
  const dispatch = useDispatch();
  const selectedInstance = useSelector(selectors.selectInstance);
  const pointCount = useSelector(selectors.selectPointCount);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);
  const paused = useSelector(selectors.selectPaused);

  const onDefaultMap = () => {
    dispatch(actions.setDefaultMap());
  };
  
  function onShowInstanceInfo() {
    dispatch(actions.toggleInstanceInfoOpen());
  }

  const onInstanceChange = event => {
    event.persist();
    const instance = event.target.value;
    dispatch(actions.setDropdownMap(instance));
  };

  const onToggleDefiningPoints = () => {
    const action = definingPoints
      ? actions.stopDefiningPoints()
      : actions.startDefiningPoints();
    dispatch(action);
  };

  const onPointCountChange = (_, newCount) => {
    dispatch(actions.setPointCount(newCount));
  };

  useEffect(() => {
    setPossiblePaths(possRoutes(pointCount));
  }, [pointCount]);

  const [num, exp] = possiblePaths.split("e+");

  return (
    <MenuSection>
      <MenuItem title="Instance">
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Select
              value={selectedInstance}
              onChange={onInstanceChange}
              disabled={running || paused || definingPoints}
              variant="outlined"
              fullWidth
              margin="dense"
            >
              <SelectItem value="grandmasRoute" key="grandmasRoute">
                Grandma's Route 4
              </SelectItem>
              <SelectItem value="gerTop5" key="germany-top-5">
                Germany Top 5
              </SelectItem>
              <SelectItem value="vacationCircuit" key="vacation-circuit">
                Vacation Circuit 6
              </SelectItem>
            </Select>
          </Grid>

          <Grid item xs={1}>
            <Typography align="right" color="textSecondary">
              <IconButton edge="end" onClick={e => {
                  onShowInstanceInfo();
                }}>
                <FontAwesomeIcon icon={faQuestion} size="xs" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
    </MenuItem>
        <MenuItem>
          <ButtonGroup
            fullWidth
            variant="outlined"
            color="secondary"
            size="large"
            disabled={running}
          >
            <Tooltip title="Random Instance">
              <Button
                onClick={onRandomizePoints}
                disabled={definingPoints || pointCount < 3}
              >
                <FontAwesomeIcon icon={faRandom} width="0" />
              </Button>
            </Tooltip>
            <Tooltip title="Choose Nodes"> 
              <Button onClick={onToggleDefiningPoints}>
                <FontAwesomeIcon
                  icon={definingPoints ? faSave : faMousePointer}
                  width="0"
                />
              </Button>
            </Tooltip>
            <Tooltip title="Default Map">
              <Button disabled={definingPoints} onClick={onDefaultMap}>
                <FontAwesomeIcon icon={faMapMarked} width="0" />
              </Button>
            </Tooltip>
          </ButtonGroup>
      </MenuItem>

      <MenuItem title="Number of random nodes">
        <Slider
          value={pointCount}
          onChange={onPointCountChange}
          step={1}
          min={3}
          max={20}
          valueLabelDisplay="auto"
          color="secondary"
          disabled={running || definingPoints}
        />
      </MenuItem>
      <MenuItem row>
        <Grid item container justify="space-between">
          <Typography
            display="inline"
            variant="button"
            color="textSecondary"
            component="div"
          >
            Possible Paths:{" "}
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            component="span"
          >
            {num} x 10<sup>{exp}</sup>
          </Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  );
};
