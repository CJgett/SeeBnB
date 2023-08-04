import React from "react";
import {
  Select,
  ListSubheader,
  MenuItem as SelectItem,
  Typography,
  Grid,
  IconButton
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { MenuSection } from "./MenuSection";
import { MenuHeader } from "./MenuHeader";
import { MenuItem } from "./MenuItem";
import { useAlgorithmInfo } from "../hooks";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";

export const MenuSolverControls = ({ onStop }) => {
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const running = useSelector(selectors.selectRunning);
  const paused = useSelector(selectors.selectPaused);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    event.persist();
    onStop();
    const solverKey = event.target.value;
    const { defaults } = algorithms.find(alg => alg.solverKey === solverKey);
    dispatch(actions.setAlgorithm(solverKey, defaults));
  };

  const onShowAlgInfo = () => {
    dispatch(actions.toggleAlgInfoOpen());
  };

  return (
    <>
      <MenuSection highlight>
        <MenuItem title="Initial Solution">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Select
                value={selectedAlgorithm}
                onChange={onAlgorithmChange}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <ListSubheader>Heuristic Construction</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-construction")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Heuristic Improvement</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-improvement")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Exhaustive</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "exhaustive")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={onShowAlgInfo}>
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
                value={selectedAlgorithm}
                onChange={onAlgorithmChange}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <ListSubheader>Heuristic Construction</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-construction")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Heuristic Improvement</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-improvement")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Exhaustive</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "exhaustive")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={onShowAlgInfo}>
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
                value={selectedAlgorithm}
                onChange={onAlgorithmChange}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <ListSubheader>Heuristic Construction</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-construction")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Heuristic Improvement</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-improvement")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Exhaustive</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "exhaustive")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right" color="textSecondary">
                <IconButton edge="end" onClick={onShowAlgInfo}>
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
