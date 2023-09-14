import random from "./exhaustive/random.worker";
import depthFirstSearch from "./search-strategy/depthFirstSearch.worker";
import branchAndBoundOnCost from "./exhaustive/branchAndBoundOnCost.worker";
import branchAndBoundOnCostAndCross from "./exhaustive/branchAndBoundOnCostAndCross.worker";


import none from "./initial-solution/none.worker";
import kruskal from "./initial-solution/kruskal.worker";
import nearestNeighbor from "./initial-solution/nearestNeighbor.worker";
import arbitraryInsertion from "./initial-solution/arbitraryInsertion.worker";
import nearestInsertion from "./initial-solution/nearestInsertion.worker";
import furthestInsertion from "./initial-solution/furthestInsertion.worker";
import convexHull from "./initial-solution/convexHull.worker";
import simulatedAnnealing from "./initial-solution/simulatedAnnealing.worker";

import twoOptInversion from "./bounding-strategy/twoOptInversion.worker";
import twoOptReciprocalExchange from "./heuristic-improvement/twoOptReciprocalExchange.worker";

export default {
  random,
  depthFirstSearch,
  branchAndBoundOnCost,
  branchAndBoundOnCostAndCross,
  
  none,
  kruskal,
  nearestNeighbor,
  arbitraryInsertion,
  furthestInsertion,
  nearestInsertion,
  convexHull,
  simulatedAnnealing,

  twoOptInversion,
  twoOptReciprocalExchange
};
