import * as actions from "./actions";

// define the instance options here 
const gerTop5 = [
  [13.4105300,52.5243700],
  [10.0111,53.5242],
  [11.5964,48.1328],
  [6.9711,50.9478],
  [8.6850,50.1379],
];

const hometownRoute = [
  [-86.15076793709714, 41.44841933102996],
  [-86.15805385600271, 41.66033526378252],
  [-86.25519626860176, 41.67574936825329],
  [-85.97486915619965, 41.68785991475081],
];

const vacationCircuit = [
  [127.001953, 37.492294],
  [127.729764, 37.881057],
  [127.384902, 36.349701],
  [129.075236, 35.179953],
  [126.74943953557997, 33.55405122278805],
  [126.59863805245867, 33.24363640858483],
];

// define the map zoom and center here
const initialViewport = {
  latitude: 51.1657,
  longitude: 10.4515,
  zoom: 4
};

const hometownViewport = {
  latitude: 41.59592617614131,
  longitude: -86.12731473663396,
  zoom: 8, 
};

const vacationViewport = {
  latitude: 35.82576380051149,
  longitude: 127.8107581650217,
  zoom: 5, 

};

// defaults
const initialState = {
  points: gerTop5,
  viewport: initialViewport,
  initialSolution: "none",
  searchStrategy: "lifo",
  boundingStrategy: "cheapestEdges",
  algorithm: "branchAndBoundOnCost",
  isBranchAndBound: true,
  algorithmType: "initial-solution",
  instance: "gerTop5",
  delay: 25,
  evaluatingDetailLevel: 2,
  maxEvaluatingDetailLevel: 2,
  showBestPath: true,

  bestPath: [],
  bestDisplaySegments: [],
  bestCost: null,

  evaluatingPaths: [],
  evaluatingCost: null,
  running: false,
  fullSpeed: false,
  paused: false,
  stepping: false,
  startedRunningAt: null,

  pointCount: gerTop5.length,
  definingPoints: false,

  tree: {},

  siteInfoOpen: false,
  algInfoOpen: false,
  instanceInfoOpen: false
};

// map the string instance name to the coordinates, viewpoint
let findInstance = (instance) => {
  if (instance === "hometownRoute") 
    return hometownRoute;
  else if (instance === "vacationCircuit")
    return vacationCircuit;
  else 
    return gerTop5;
};

let findViewport = (instance) => {
  if (instance === "hometownRoute") 
    return hometownViewport;
  else if (instance === "vacationCircuit")
    return vacationViewport;
  else
    return initialViewport;
};


export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actions.TOGGLE_SITE_INFO_OPEN:
      return {
        ...state,
        siteInfoOpen: !state.siteInfoOpen
      };

    case actions.TOGGLE_ALG_INFO_OPEN:
      return {
        ...state,
        algInfoOpen: !state.algInfoOpen
      };
   
    case actions.TOGGLE_INSTANCE_INFO_OPEN:
      return {
        ...state,
        instanceInfoOpen: !state.instanceInfoOpen
      };

    case actions.SET_VIEWPORT_STATE:
      return {
        ...state,
        viewport: action.viewport
      };

    // NODE TREE
    
    case actions.UPDATE_TREE:
      return {
        ...state,
        tree: action.tree
      }

    case actions.RESET_EVALUATING_STATE:
      return {
        ...state,
        evaluatingPaths: [],
        evaluatingCost: null
      };

    case actions.RESET_BEST_PATH_STATE:
      return {
        ...state,
        bestPath: [],
        bestCost: null
      };

    //
    // SOLVER CONTROLS
    //
    case actions.SET_INITIAL_SOLUTION:
      return {
        ...state,
        ...action.defaults,
        initialSolution: action.initialSolution
      };

    case actions.SET_SEARCH_STRATEGY:
      return {
        ...state,
        ...action.defaults,
        searchStrategy: action.searchStrategy
      };

    case actions.SET_BOUNDING_STRATEGY:
      return {
        ...state,
        ...action.defaults,
        boundingStrategy: action.boundingStrategy
      };

    case actions.SET_ALGORITHM:
      return {
        ...state,
        ...action.defaults,
        algorithm: action.algorithm
      };

    case actions.SET_ALGORITHM_TYPE:
      return {
        ...state,
        algorithmType: action.algorithmType
      };

    case actions.SET_ALGORITHM_STAGE:
      return {
        ...state,
        isBranchAndBound: ((action.isBranchAndBound === "toggle") ? !state.isBranchAndBound : action.isBranchAndBound)
      };

    case actions.SET_DELAY:
      return {
        ...state,
        delay: action.delay
      };

    case actions.SET_EVALUATING_DETAIL_LEVEL:
      return {
        ...state,
        evaluatingDetailLevel: action.level,
        evaluatingPaths: action.level ? state.evaluatingPaths : [],
        evaluatingCost: action.level ? state.evaluatingCost : null
      };

    case actions.SET_SHOW_BEST_PATH:
      return {
        ...state,
        showBestPath: action.show
      };

    case actions.START_SOLVING:
      return {
        ...state,
        showBestPath: false,
        running: true,
        startedRunningAt: Date.now(),
        pointCount: state.points.length,
        evaluatingDetailLevel: 2,
        fullSpeed: false,
      };

    case actions.GO_FULL_SPEED:
      return {
        ...state,
        showBestPath: true,
        evaluatingDetailLevel: 0,
        evaluatingPaths: [],
        fullSpeed: true,
      };

   case actions.GO_STEP_BY_STEP:
      return {
        ...state,
        stepping: true
      };

    case actions.STOP_STEPPING:
      return {
        ...state,
        stepping: false
      };

    case actions.PAUSE:
      return {
        ...state,
        paused: true,
        running: false
      };

    case actions.UNPAUSE:
      return {
        ...state,
        paused: false,
        running: true
      };

    case actions.STOP_SOLVING:
      return {
        ...state,
        points: state.points,
        showBestPath: true,
        running: false,
        paused: false,
        fullSpeed: false,
        stepping: false,
        startedRunningAt: null
      };

    //
    // SOLVER ACTIONS
    //
    case actions.SET_EVALUATING_PATHS:
      return {
        ...state,
        evaluatingPaths: state.evaluatingDetailLevel ? action.paths : [],
        evaluatingCost: state.evaluatingDetailLevel ? action.cost : null
      };

    case actions.SET_BEST_PATH:
      return {
        ...state,
        bestPath: action.path,
        bestCost: action.cost
      };

    //
    // POINT CONTROLS
    //
    case actions.SET_POINT_COUNT:
      return {
        ...state,
        pointCount: action.count
      };

    case actions.SET_POINTS:
      return {
        ...state,
        points: action.points
      };

    case actions.START_DEFINING_POINTS:
      return {
        ...state,
        points: [],
        definingPoints: true,
        pointCount: 0
      };

    case actions.ADD_DEFINED_POINT:
      return {
        ...state,
        points: [...state.points, action.point],
        pointCount: state.pointCount + 1
      };

    case actions.STOP_DEFINING_POINTS:
      return {
        ...state,
        definingPoints: false
      };

    case actions.SET_DEFAULT_MAP:
      return {
        ...state,
        viewport: initialViewport,
        points: gerTop5,
        pointCount: gerTop5.length,
        instance: "gerTop5"
      };

    case actions.SET_DROPDOWN_MAP:
      return {
        ...state,
        viewport: findViewport(action.instance),
        points: findInstance(action.instance),
        pointCount: findInstance(action.instance).length,
        instance: action.instance
      };

    default:
      return state;
  }
};
