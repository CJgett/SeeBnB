import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AlgorithmModals,
  IntroductionModal,
  InstanceModal,
  Layout,
  BottomMenu,
  MapPlot,
  MapAndBottomMenuContainer,
  Menu,
  SEO,
} from "../components";
import { useSolverWorker } from "../hooks";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

const IndexPage = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(
    selectors.selectEvaluatingDetailLevel
  );
  const points = useSelector(selectors.selectPoints);
  const pointCount = useSelector(selectors.selectPointCount);
  const definingPoints = useSelector(selectors.selectDefiningPoints);
  const stepping = useSelector(selectors.selectStepping);
  const paused = useSelector(selectors.selectPaused);
  const solver = useSolverWorker(dispatch, algorithm);


  const onRandomizePoints = useCallback(() => {
    if (!definingPoints) {
      const bounds = mapRef.current.getBounds();
      dispatch(actions.randomizePoints(bounds, pointCount));
    }
  }, [mapRef, dispatch, pointCount, definingPoints]);

  const start = useCallback(() => {
    console.log("started solving. Stepping: " + stepping);
    dispatch(actions.startSolving(points, delay, evaluatingDetailLevel, false));
    solver.postMessage(
      actions.startSolvingAction(points, delay, evaluatingDetailLevel, false)
    );
  }, [solver, dispatch, delay, points, evaluatingDetailLevel ]);

  const fullSpeed = useCallback(() => {
    dispatch(actions.goFullSpeed());
    solver.postMessage(actions.goFullSpeed());
  }, [solver, dispatch]);

  const pause = useCallback(() => {
    dispatch(actions.pause());
    solver.postMessage(actions.pause());
  }, [solver, dispatch]);

  const unpause = useCallback(() => {
    dispatch(actions.unpause());
    solver.postMessage(actions.unpause());
  }, [solver, dispatch]);

  const step = useCallback(() => {
    dispatch(actions.goStepByStep());
    solver.postMessage(actions.goStepByStep());
    if (paused) 
      unpause();
    else {
      dispatch(actions.startSolving(points, delay, evaluatingDetailLevel, true));
      solver.postMessage(
        actions.startSolvingAction(points, delay, evaluatingDetailLevel, true)
      );
    }
  }, [solver, dispatch, stepping, start]);

  const stopStep = useCallback(() => {
    dispatch(actions.stopStepping());
    solver.postMessage(actions.stopStepping());
  }, [solver, dispatch]);

  const stop = useCallback(() => {
    dispatch(actions.stopSolving());
    solver.terminate();
  }, [solver, dispatch]);

  

  useEffect(() => {
    solver.postMessage(actions.setDelay(delay));
  }, [delay, solver]);

  useEffect(() => {
    solver.postMessage(actions.setEvaluatingDetailLevel(evaluatingDetailLevel));
  }, [evaluatingDetailLevel, solver]);

  return (
    <Layout>
      <SEO />
      <IntroductionModal />
      <AlgorithmModals />
      <InstanceModal />
      <Menu
        onStart={start}
        onPause={pause}
        onUnPause={unpause}
        onFullSpeed={fullSpeed}
        onStep={step}
        onStopStep={stopStep}
        onStop={stop}
        onRandomizePoints={onRandomizePoints}
      />
      <MapAndBottomMenuContainer>
        <MapPlot ref={mapRef}></MapPlot>
        <BottomMenu></BottomMenu>
      </MapAndBottomMenuContainer>
    </Layout>
  );
};

export default IndexPage;
