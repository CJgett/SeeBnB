import branchAndBoundOnCost from "./exhaustive/branchAndBoundOnCost.worker";

import none from "./initial-solution/none.worker";
import nearestNeighbor from "./initial-solution/nearestNeighbor.worker";
import arbitraryInsertion from "./initial-solution/arbitraryInsertion.worker";
import nearestInsertion from "./initial-solution/nearestInsertion.worker";
import farthestInsertion from "./initial-solution/farthestInsertion.worker";
import convexHull from "./initial-solution/convexHull.worker";
import simulatedAnnealing from "./initial-solution/simulatedAnnealing.worker";

import depthFirstSearch from "./search-strategy/depthFirstSearch.worker";
import breadthFirstSearch from "./search-strategy/breadthFirstSearch.worker";
import minimumLowerBound from "./search-strategy/minimumLowerBound.worker";

import cheapestEdges from "./bounding-strategy/cheapestEdges.worker";
import oneTree from "./bounding-strategy/oneTree.worker";
import oneTreeWithAscent from "./bounding-strategy/oneTreeWithAscent.worker";
import currentCost from "./bounding-strategy/currentCost.worker";

export default {
  branchAndBoundOnCost,
  
  none,
  nearestNeighbor,
  arbitraryInsertion,
  farthestInsertion,
  nearestInsertion,
  convexHull,
  simulatedAnnealing,

  depthFirstSearch,
  breadthFirstSearch,
  minimumLowerBound,

  currentCost,
  cheapestEdges,
  oneTree,
  oneTreeWithAscent,
};
