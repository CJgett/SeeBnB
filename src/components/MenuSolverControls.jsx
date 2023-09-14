import React from "react";
import {
  Select,
  Typography,
  Grid,
  MenuItem as SelectItem,
  IconButton
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { useAlgorithmInfo } from "../hooks";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";

export const MenuSolverControls = ({ onStop }) => {
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithmInitial = useSelector(selectors.selectInitialSolution);
  const selectedAlgorithmSearch = useSelector(selectors.selectSearchStrategy);
  const selectedAlgorithmBounding = useSelector(selectors.selectBoundingStrategy);
  const running = useSelector(selectors.selectRunning);
  const paused = useSelector(selectors.selectPaused);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  function onAlgorithmChange(event, algorithmType) {
    event.persist();
    onStop();
    dispatch(actions.resetSolverState());
    const solverKey = event.target.value;
    const { defaults } = algorithms.find(alg => alg.solverKey === solverKey);
    if(algorithmType === "initial-solution") { 
      dispatch(actions.setInitialSolution(solverKey, defaults));
      if (solverKey === "none") 
        dispatch(actions.setAlgorithmStage(true));
      else 
        dispatch(actions.setAlgorithmStage(false));
    }
    else if (algorithmType === "search-strategy") 
      dispatch(actions.setSearchStrategy(solverKey, defaults));
    else 
      dispatch(actions.setBoundingStrategy(solverKey, defaults));
  }

  function setAlgorithmType(algorithmType) {
    dispatch(actions.setAlgorithmType(algorithmType));
  }

  function onShowAlgInfo() {
    dispatch(actions.toggleAlgInfoOpen());
  }

  return (
    <>
      <MenuSection highlight>
        <MenuItem title="Initial Solution">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Select
                value={selectedAlgorithmInitial}
                onChange={e => {
                  onAlgorithmChange(e, "initial-solution");
                }}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                {algorithms
                .filter(alg => alg.type === "initial-solution")
                .map(alg => (
                  <SelectItem value={alg.solverKey} key={alg.solverKey}>
                    {alg.friendlyName}
                  </SelectItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={e => {
                  setAlgorithmType("initial-solution");
                  onShowAlgInfo();
                }}>
                  <FontAwesomeIcon icon={faQuestion} size="xs" />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
       
        <MenuItem title="Search Strategy">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Select
                value={selectedAlgorithmSearch}
                onChange={e => {
                  onAlgorithmChange("search-strategy");
                }}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                {algorithms
                  .filter(alg => alg.type === "search-strategy")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={e => {
                  setAlgorithmType("search-strategy");
                  onShowAlgInfo();
                }}>
                  <FontAwesomeIcon icon={faQuestion} size="xs" />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
        
        <MenuItem title="Bounding Strategy">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Select
                value={selectedAlgorithmBounding}
                onChange={e => {
                  onAlgorithmChange(e, "bounding-strategy");
                }}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                {algorithms
                  .filter(alg => alg.type === "bounding-strategy")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={e => {
                  setAlgorithmType("bounding-strategy");
                  onShowAlgInfo();
                }}>
                  <FontAwesomeIcon icon={faQuestion} size="xs" />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </MenuSection>
    </>
  );
};
