import branchAndBoundOnCost from "./exhaustive/branchAndBoundOnCost.worker";

import none from "./initial-solution/none.worker";
import kruskal from "./initial-solution/kruskal.worker";
import nearestNeighbor from "./initial-solution/nearestNeighbor.worker";
import arbitraryInsertion from "./initial-solution/arbitraryInsertion.worker";
import nearestInsertion from "./initial-solution/nearestInsertion.worker";
import furthestInsertion from "./initial-solution/furthestInsertion.worker";
import convexHull from "./initial-solution/convexHull.worker";
import simulatedAnnealing from "./initial-solution/simulatedAnnealing.worker";

import depthFirstSearch from "./search-strategy/depthFirstSearch.worker";
import breadthFirstSearch from "./search-strategy/breadthFirstSearch.worker";
import minimumLowerBound from "./search-strategy/minimumLowerBound.worker";

import cheapestEdges from "./bounding-strategy/cheapestEdges.worker";
import singleCycleTree from "./bounding-strategy/singleCycleTree.worker";
import singleCycleTreeWithAscent from "./bounding-strategy/singleCycleTreeWithAscent.worker";
import noBounding from "./bounding-strategy/none.worker";

export default {
  branchAndBoundOnCost,
  
  none,
  kruskal,
  nearestNeighbor,
  arbitraryInsertion,
  furthestInsertion,
  nearestInsertion,
  convexHull,
  simulatedAnnealing,

  depthFirstSearch,
  breadthFirstSearch,
  minimumLowerBound,

  noBounding,
  cheapestEdges,
  singleCycleTree,
  singleCycleTreeWithAscent,
};
