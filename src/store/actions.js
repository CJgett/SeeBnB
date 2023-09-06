import gtmEmit from "./emitCustomEvent";
export const SET_VIEWPORT_STATE = "SET_VIEWPORT_STATE";

export const RESET_EVALUATING_STATE = "RESET_EVALUATING_STATE";
export const RESET_BEST_PATH_STATE = "RESET_BEST_PATH_STATE";


export const SET_INITIAL_SOLUTION = "SET_INITIAL_SOLUTION";
export const SET_SEARCH_STRATEGY = "SET_SEARCH_STRATEGY";
export const SET_BOUNDING_STRATEGY = "SET_BOUNDING_STRATEGY";
export const SET_ALGORITHM = "SET_ALGORITHM";
export const SET_ALGORITHM_TYPE = "SET_ALGORITHM_TYPE";
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
export const SET_DEFAULT_MAP = "SET_DEFAULT_MAP";
export const SET_DROPDOWN_MAP = "SET_DROPDOWN_MAP";

export const TOGGLE_SITE_INFO_OPEN = "TOGGLE_SITE_INFO_OPEN";
export const TOGGLE_ALG_INFO_OPEN = "TOGGLE_ALG_INFO_OPEN";
export const TOGGLE_INSTANCE_INFO_OPEN = "TOGGLE_INSTANCE_INFO_OPEN";

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

//
// MAP INTERACTION
//
export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
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

export const startSolvingAction = (points, delay, evaluatingDetailLevel, stepping) => ({
  type: START_SOLVING,
  points,
  delay,
  evaluatingDetailLevel,
  fullSpeed: false,
  stepping
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
};

export const startSolving = (...args) => (dispatch, getState) => {
  const { initialSolution, pointCount, algorithm } = getState();
  gtmEmit({
    event: "start-solving",
    initialSolution,
    algorithm,
    pointCount
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

export const setEvaluatingPaths = (paths, cost) => ({
  type: SET_EVALUATING_PATHS,
  paths,
  cost
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
  dispatch(resetSolverState());
  dispatch(setPointsAction(points));
};

export const setDefaultMap = (...args) => dispatch => {
  dispatch(resetSolverState());
  dispatch(setDefaultMapAction());
};

export const setDropdownMap = (instance) => dispatch => {
  dispatch(resetSolverState());
  dispatch(setDropdownMapAction(instance));
};
