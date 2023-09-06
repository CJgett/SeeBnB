import React, { useEffect } from "react";
import {
  ButtonGroup,
  Button,
  Slider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepForward,
  faPlay,
  faStop,
  faRedo,
  faFastForward,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";
import { useAlgorithmInfo } from "../hooks";

export const MenuRunControls = ({
  onStart,
  onPause,
  onUnPause,
  onFullSpeed,
  onStep,
  onStopStep,
  onStop
}) => {
  const dispatch = useDispatch();
  const delay = useSelector(selectors.selectDelay);
  const running = useSelector(selectors.selectRunning);
  const fullSpeed = useSelector(selectors.selectFullSpeed);
  const stepping = useSelector(selectors.selectStepping);
  const paused = useSelector(selectors.selectPaused);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const algorithms = useAlgorithmInfo();
  const algorithm = useSelector(selectors.selectAlgorithm);
  const initialSolutionAlg = useSelector(selectors.selectInitialSolution);
  const searchAlg = useSelector(selectors.selectSearchStrategy);

  useEffect(() => {
    console.log("stepping value after goStep: " + stepping);
  }, [stepping]);

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay));
  };

  // use function when play button is pressed, start solving without stepping
  function stopStepThenStart() {
    if (stepping) {
      console.log("stopthenstart");
      onStopStep();
    }
    console.log("just start");
    onStart();
  }

  function stopStepThenUnPause() {
    console.log("stopstepthenunpause");
    if (stepping) 
      onStopStep();
    onUnPause();
  }
  
  const onReset = () => {
    onStop();
    dispatch(actions.resetSolverState());
  };

  return (
    <>
      <MenuSection>
        <MenuItem title="Controls">
          <ButtonGroup
            fullWidth
            variant="outlined"
            color="secondary"
            size="large"
          >
            <Button onClick={onStep} disabled={running || definingPoints}>
              <FontAwesomeIcon icon={faStepForward} width="0" />
            </Button>

            <Button
              onClick={e => {
                paused ? stopStepThenUnPause() : running ? onPause() : stopStepThenStart();
              }}
              disabled={definingPoints || fullSpeed}
            >
              <FontAwesomeIcon
                icon={paused ? faPlay : running ? faPause : faPlay}
                width="0"
              />
            </Button>

            <Button
              onClick={paused ? onStop : onFullSpeed}
              disabled={(!running && !paused) || definingPoints || fullSpeed}
            >
              <FontAwesomeIcon
                icon={paused ? faStop : faFastForward}
                width="0"
              />
            </Button>

            <Button onClick={onReset} disabled={(running && !fullSpeed) || definingPoints}>
              <FontAwesomeIcon icon={faRedo} width="0" />
            </Button>

          </ButtonGroup>
        </MenuItem>
        <MenuItem title="Delay">
          <Slider
            value={delay}
            onChange={onDelayChange}
            step={25}
            min={0}
            max={250}
            valueLabelDisplay="auto"
            color="secondary"
            disabled={definingPoints || fullSpeed}
          />
        </MenuItem>
      </MenuSection>
    </>
  );
};
