import gtmEmit from "./emitCustomEvent";
export const SET_VIEWPORT_STATE = "SET_VIEWPORT_STATE";

export const UPDATE_TREE = "UPDATE_TREE";
export const UPDATE_NUM_NODES = "UPDATE_NUM_NODES";
export const UPDATE_RUN_TABLE = "UPDATE_RUN_TABLE";
export const RESET_RUN_TABLE = "RESET_RUN_TABLE";

export const RESET_EVALUATING_STATE = "RESET_EVALUATING_STATE";
export const RESET_BEST_PATH_STATE = "RESET_BEST_PATH_STATE";

export const SET_INITIAL_SOLUTION = "SET_INITIAL_SOLUTION";
export const SET_SEARCH_STRATEGY = "SET_SEARCH_STRATEGY";
export const SET_BOUNDING_STRATEGY = "SET_BOUNDING_STRATEGY";
export const SET_ALGORITHM = "SET_ALGORITHM";
export const SET_ALGORITHM_TYPE = "SET_ALGORITHM_TYPE";
export const SET_ALGORITHM_STAGE = "SET_ALGORITHM_STAGE";
export const SET_DELAY = "SET_DELAY";
export const SET_EVALUATING_DETAIL_LEVEL = "SET_EVALUATING_DETAIL_LEVEL";
export const SET_SHOW_BEST_PATH = "SET_SHOW_BEST_PATH";
export const START_SOLVING = "START_SOLVING";
export const GO_FULL_SPEED = "GO_FULL_SPEED";
export const GO_STEP_BY_STEP = "GO_STEP_BY_STEP";
export const STOP_STEPPING = "STOP_STEPPING";
export const PAUSE = "PAUSE";
export const UNPAUSE = "UNPAUSE";
export const STOP_SOLVING = "STOP_SOLVING";

export const SET_BEST_PATH = "SET_BEST_PATH";
export const SET_EVALUATING_PATHS = "SET_EVALUATING_PATHS";

export const START_DEFINING_POINTS = "START_DEFINING_POINTS";
export const ADD_DEFINED_POINT = "ADD_DEFINED_POINT";
export const STOP_DEFINING_POINTS = "STOP_DEFINING_POINTS";
export const SET_POINT_COUNT = "SET_POINT_COUNT";
export const SET_POINTS = "SET_POINTS";
export const SET_TABLE_INSTANCE = "SET_TABLE_INSTANCE";
export const SET_DEFAULT_MAP = "SET_DEFAULT_MAP";
export const SET_DROPDOWN_MAP = "SET_DROPDOWN_MAP";

export const TOGGLE_SITE_INFO_OPEN = "TOGGLE_SITE_INFO_OPEN";
export const TOGGLE_ALG_INFO_OPEN = "TOGGLE_ALG_INFO_OPEN";
export const TOGGLE_INSTANCE_INFO_OPEN = "TOGGLE_INSTANCE_INFO_OPEN";
export const TOGGLE_EXPANDED_TREE_OPEN = "TOGGLE_EXPANDED_TREE_OPEN";

const getRandomPoint = (max, min) => Math.random() * (max - min) + min;

//
// BASIC UI
//
export const toggleSiteInfoOpen = () => ({
  type: TOGGLE_SITE_INFO_OPEN
});

export const toggleAlgInfoOpen = () => ({
  type: TOGGLE_ALG_INFO_OPEN
});

export const toggleInstanceInfoOpen = () => ({
  type: TOGGLE_INSTANCE_INFO_OPEN
});

export const toggleExpandedTreeOpen = () => ({
  type: TOGGLE_EXPANDED_TREE_OPEN
});

//
// MAP INTERACTION
//
export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
});

//
// BOTTOM MENU 
//
export const updateTree = (tree, numNodes) => ({
  type: UPDATE_TREE,
  tree,
  numNodes
});

export const updateNumNodes = numNodes => ({
  type: UPDATE_NUM_NODES,
  numNodes
});

export const updateRunTable = row => ({
  type: UPDATE_RUN_TABLE,
  row 
});

export const resetRunTable = () => ({
  type: RESET_RUN_TABLE
});

//
// SOLVER CONTROLS
//
const resetEvaluatingStateAction = () => ({
  type: RESET_EVALUATING_STATE
});

const resetBestPathStateAction = () => ({
  type: RESET_BEST_PATH_STATE
});

const setInitialSolutionAction = (initialSolution, defaults) => ({
  type: SET_INITIAL_SOLUTION,
  initialSolution,
  defaults
});

const setSearchStrategyAction = (searchStrategy, defaults) => ({
  type: SET_SEARCH_STRATEGY,
  searchStrategy,
  defaults
});

const setBoundingStrategyAction = (boundingStrategy, defaults) => ({
  type: SET_BOUNDING_STRATEGY,
  boundingStrategy,
  defaults
});

const setAlgorithmAction = (algorithm, defaults) => ({
  type: SET_ALGORITHM,
  algorithm,
  defaults
});

const setAlgorithmTypeAction = (algorithmType, defaults) => ({
  type: SET_ALGORITHM_TYPE,
  algorithmType,
  defaults
});

// this EITHER toggles based on what the current value is OR sets the stage to isRunningBnB (boolean, when true, then run BranchAndBound, otherwise run heuristic)
export const setAlgorithmStage = (isRunningBnB) => ({
  type: SET_ALGORITHM_STAGE,
  isRunningBnB 
});

export const startSolvingAction = (points, delay, evaluatingDetailLevel, stepping, bestCostFromHeuristic, searchStrategy, boundingStrategy, initialSolution, instance, runID) => ({
  type: START_SOLVING,
  points,
  delay,
  fullSpeed: false,
  evaluatingDetailLevel,
  stepping,
  bestCostFromHeuristic,
  searchStrategy,
  boundingStrategy,
  initialSolution,
  instance,
  runID
});

export const stopSolvingAction = () => ({
  type: STOP_SOLVING
});

export const setAlgorithm = (algorithm, defaults = {}) => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(setAlgorithmAction(algorithm, defaults));
};

export const setAlgorithmType = (algorithmType) => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(setAlgorithmTypeAction(algorithmType));
};

export const setInitialSolution = (initialSolution, defaults = {}) => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(setInitialSolutionAction(initialSolution, defaults));
};

export const setSearchStrategy = (searchStrategy, defaults = {}) => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(setSearchStrategyAction(searchStrategy, defaults));
};

export const setBoundingStrategy = (boundingStrategy, defaults = {}) => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(setBoundingStrategyAction(boundingStrategy, defaults));
};

export const setDelay = delay => ({
  type: SET_DELAY,
  delay
});

export const setEvaluatingDetailLevel = level => ({
  type: SET_EVALUATING_DETAIL_LEVEL,
  level
});

export const setShowBestPath = show => ({
  type: SET_SHOW_BEST_PATH,
  show
});

export const resetSolverState = () => dispatch => {
  dispatch(stopSolving());
  dispatch(resetEvaluatingStateAction());
  dispatch(resetBestPathStateAction());
  dispatch(setAlgorithmStage(false));
};

export const startSolving = (...args) => (dispatch, getState) => {
  const { initialSolution, pointCount, algorithm, evaluatingDetailLevel, bestCost } = getState();
  gtmEmit({
    event: "start-solving",
    initialSolution,
    algorithm,
    pointCount,
    evaluatingDetailLevel,
    bestCost
  });
  dispatch(startSolvingAction(...args));
};

export const goFullSpeed = () => ({
  type: GO_FULL_SPEED
});

export const goStepByStep = () => ({
  type: GO_STEP_BY_STEP
});

export const stopStepping = () => ({
  type: STOP_STEPPING
});

export const pause = () => ({
  type: PAUSE
});

export const unpause = () => ({
  type: UNPAUSE
});

export const stopSolving = () => dispatch => {
  dispatch(resetEvaluatingStateAction());
  dispatch(stopSolvingAction());
};

//
// SOLVER ACTIONS
//
export const setEvaluatingPath = (path, cost) => ({
  type: SET_EVALUATING_PATHS,
  paths: [path],
  cost
});

export const setEvaluatingPaths = (paths, cost, lowerBound) => ({
  type: SET_EVALUATING_PATHS,
  paths,
  cost,
  lowerBound
});

export const setBestPath = (path, cost) => ({
  type: SET_BEST_PATH,
  path,
  cost
});

//
// POINT CONTROLS
//
const setDefaultMapAction = () => ({
  type: SET_DEFAULT_MAP
});

export const setTableInstance = (instance) => ({
  type: SET_TABLE_INSTANCE,
  instance
});

const setDropdownMapAction = (instance) => ({
  type: SET_DROPDOWN_MAP,
  instance
});

const setPointsAction = points => ({
  type: SET_POINTS,
  points
});

const setPointCountAction = count => ({
  type: SET_POINT_COUNT,
  count
});

const startDefiningPointsAction = () => ({
  type: START_DEFINING_POINTS
});

export const startDefiningPoints = () => dispatch => {
  dispatch(resetSolverState());
  dispatch(startDefiningPointsAction());
};

export const addDefinedPoint = point => ({
  type: ADD_DEFINED_POINT,
  point
});

export const stopDefiningPoints = () => ({
  type: STOP_DEFINING_POINTS
});

export const setPointCount = count => dispatch => {
  dispatch(resetSolverState());
  dispatch(setPointCountAction(count));
};

export const randomizePoints = bounds => (dispatch, getState) => {
  const { pointCount } = getState();
  const { top, bottom, left, right } = bounds;
  const points = Array.from({ length: pointCount }).map(_ => [
    getRandomPoint(right, left),
    getRandomPoint(top, bottom)
  ]);
  const instance = pointCount + "nodes_" + Date.now().toString().slice(8);
  dispatch(resetSolverState());
  dispatch(setPointsAction(points));
  dispatch(setTableInstance(instance));
};

export const setDefaultMap = (...args) => dispatch => {
  dispatch(resetSolverState());
  dispatch(setDefaultMapAction());
};

export const setDropdownMap = (instance) => dispatch => {
  dispatch(resetSolverState());
  dispatch(setDropdownMapAction(instance));
  dispatch(setTableInstance(instance));
};
