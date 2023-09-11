import React, {
  useRef,
  useEffect,
  useCallback,
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
import { useSolverWorker, useAlgorithmInfo } from "../hooks";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

const IndexPage = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const algorithms = useAlgorithmInfo();
  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const points = useSelector(selectors.selectPoints);
  const pointCount = useSelector(selectors.selectPointCount);
  const evaluatingDetailLevel = useSelector(selectors.selectEvaluatingDetailLevel);
  const definingPoints = useSelector(selectors.selectDefiningPoints);
  const paused = useSelector(selectors.selectPaused);
  const algorithmStage = useSelector(selectors.selectAlgorithmStage);
  const initialSolution = useSelector(selectors.selectInitialSolution);
  const solver = useSolverWorker(dispatch, algorithm);
  const heuristicSolver = useSolverWorker(dispatch, initialSolution);
  let stepping = false;

  const onRandomizePoints = useCallback(() => {
    if (!definingPoints) {
      const bounds = mapRef.current.getBounds();
      dispatch(actions.randomizePoints(bounds, pointCount));
    }
  }, [mapRef, dispatch, pointCount, definingPoints]);

  const handleRunHeuristic = useCallback(() => {
    console.log("stepping: " + stepping);
    dispatch(actions.startSolving(points, delay, evaluatingDetailLevel, stepping));
    heuristicSolver.postMessage(actions.startSolvingAction(points, delay, evaluatingDetailLevel, stepping));
    }, [heuristicSolver, dispatch, delay, points, stepping, evaluatingDetailLevel]);

  const runBnB = useCallback((stepping) => {
    console.log("initialSolution " + initialSolution);
    const { defaults } = algorithms.find(alg => alg.solverKey === initialSolution);
    dispatch(actions.setAlgorithm(initialSolution, defaults));
    handleRunHeuristic(stepping); 

  }, [dispatch, algorithms, handleRunHeuristic, initialSolution]);
  
  function start() {
    stepping = false;
    dispatch(actions.stopStepping());
    dispatch(actions.setAlgorithmStage("initialSolution"));
    runBnB(stepping);
  }

  const fullSpeed = useCallback(() => {
    dispatch(actions.goFullSpeed());
    solver.postMessage(actions.goFullSpeed());
  }, [solver, dispatch]);

  const pause = useCallback(() => {
    dispatch(actions.pause());
    heuristicSolver.postMessage(actions.pause());
  }, [ dispatch, heuristicSolver]);

  const unpause = useCallback(() => {
    dispatch(actions.unpause());
    heuristicSolver.postMessage(actions.unpause());
  }, [dispatch, heuristicSolver]);

  function step() {
    stepping = true;
    dispatch(actions.goStepByStep());
    stepWithCallback(stepping);
  }
  
  function findCurrentSolver() {
    console.log("algorithmStage " + algorithmStage);
    if (algorithmStage === "initialSolution")
      return heuristicSolver;
    else 
      return solver;
  }
    
  const stepWithCallback  = useCallback((stepping) => {
    heuristicSolver.postMessage(actions.goStepByStep());
    if (paused) 
      unpause();
    else {
      dispatch(actions.setAlgorithmStage("initialSolution"));
      runBnB(stepping); 
    }
  }, [heuristicSolver, dispatch, paused, unpause, runBnB]);
  
  function stopStep() {
    stepping = false 
    dispatch(actions.stopStepping());
    heuristicSolver.postMessage(actions.stopStepping());
  }

  const stop = useCallback(() => {
    dispatch(actions.stopSolving());
    solver.terminate();
  }, [solver, dispatch]);

  useEffect(() => {
    solver.postMessage(actions.setDelay(delay));
  }, [delay, solver]);

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
