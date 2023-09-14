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
  const initialSolution = useSelector(selectors.selectInitialSolution);
  const bestCost = useSelector(selectors.selectBestCost);
  const isBranchAndBound = useSelector(selectors.selectAlgorithmStage);
  const branchAndBound = "branchAndBoundOnCost";
  const solver = useSolverWorker(dispatch, branchAndBound);
  const initialSolutionSolver = useSolverWorker(dispatch, initialSolution);
  let stepping = false;

  const onRandomizePoints = useCallback(() => {
    if (!definingPoints) {
      const bounds = mapRef.current.getBounds();
      dispatch(actions.randomizePoints(bounds, pointCount));
    }
  }, [mapRef, dispatch, pointCount, definingPoints]);

  // runs EITHER heuristic OR branchAndBound, based on whether or not algorithmStage isBranchAndBound
  const runBnB = useCallback((stepping) => {
    let { defaults } = {};
    let currentSolver = "";
    console.log("stepping at start of runBnB: " + stepping);
    // find initial solution, as long as heuristic is not set to none and algorithmStage is not branch and bound
    if (initialSolution !== "none" && isBranchAndBound === false) {
      currentSolver = initialSolutionSolver;
      console.log("made it to initialSolution");
      defaults = algorithms.find(alg => alg.solverKey === initialSolution);
      dispatch(actions.setAlgorithm(initialSolution, defaults));
      dispatch(actions.startSolving(points, delay, evaluatingDetailLevel, stepping, bestCost));
      currentSolver.postMessage(actions.startSolvingAction(points, delay, evaluatingDetailLevel, stepping, bestCost));
    }
    else if (isBranchAndBound === true) { 
      currentSolver = solver;
      console.log("algorithms at startBnB = " + algorithms);
      // TODO change to bnb from initialSolution in next line!
      defaults = algorithms.find(alg => alg.solverKey === initialSolution);
      dispatch(actions.setAlgorithm(branchAndBound, defaults));
      dispatch(actions.startSolving(points, delay, evaluatingDetailLevel, stepping, bestCost));
      currentSolver.postMessage(actions.startSolvingAction(points, delay, evaluatingDetailLevel, stepping, bestCost));
    }
  }, [dispatch, solver, initialSolutionSolver, algorithms, initialSolution, isBranchAndBound, bestCost, points, delay, evaluatingDetailLevel]);
  
  function start() {
    stepping = false;
    startWithCallback(stepping);
  }

  const startWithCallback = useCallback((stepping) => {
    dispatch(actions.stopStepping());
    solver.postMessage(actions.stopStepping());
    initialSolutionSolver.postMessage(actions.stopStepping());
    runBnB(stepping);
  }, [solver, initialSolutionSolver, dispatch, runBnB]);

  const fullSpeed = useCallback(() => {
    dispatch(actions.goFullSpeed());
    solver.postMessage(actions.goFullSpeed());
    initialSolutionSolver.postMessage(actions.goFullSpeed());
  }, [solver, initialSolutionSolver, dispatch]);

  const pause = useCallback(() => {
    dispatch(actions.pause());
    solver.postMessage(actions.pause());
    initialSolutionSolver.postMessage(actions.pause());
  }, [dispatch, initialSolutionSolver, solver]);

  const unpause = useCallback(() => {
    dispatch(actions.unpause());
    solver.postMessage(actions.unpause());
    initialSolutionSolver.postMessage(actions.unpause());
  }, [dispatch, initialSolutionSolver, solver]);

  function step() {
    stepping = true;
    stepWithCallback(stepping);
  }
    
  const stepWithCallback  = useCallback((stepping) => {
    dispatch(actions.goStepByStep());
    if (paused) {
      solver.postMessage(actions.goStepByStep());
      unpause();
    }
    else 
      runBnB(stepping); 
  }, [solver, dispatch, paused, unpause, runBnB]);
  
  function stopStep() {
    stepping = false 
    dispatch(actions.stopStepping());
    solver.postMessage(actions.stopStepping());
    initialSolutionSolver.postMessage(actions.stopStepping());
  }

  const stop = useCallback(() => {
    dispatch(actions.stopSolving());
    solver.terminate();
    initialSolutionSolver.terminate();
  }, [solver, dispatch, initialSolutionSolver]);

  useEffect(() => {
    solver.postMessage(actions.setDelay(delay));
    initialSolutionSolver.postMessage(actions.setDelay(delay));
  }, [delay, solver, initialSolutionSolver]);

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
