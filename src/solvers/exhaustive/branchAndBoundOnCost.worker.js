/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, setDifference, distance } from "../cost";
import { hasPoint, createEdgePriorityQueue, calculateLowerBound, initializeToVisit } from "./bnbHelpers";
import { TreeNode } from "../data-structures/TreeNode";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_ERROR_COLOR,
  EVALUATING_SEGMENT_COLOR
} from "../../constants";

const branchAndBoundOnCost = async (
  points,
  bestCostFromHeuristic,
  searchStrategy,
  boundingStrategy,
) => {
  // initialize run variables
  
  const startingPoint = points.slice(0).shift();

  let overallBestCost = bestCostFromHeuristic;
  if (overallBestCost === null) {
    overallBestCost = Infinity;
  }
  let overallBestPath = [];

  // create priority queue of edges ordered by cost (low to high). 
  // Only needed for cheapest edges bounding strategy
  const edges = createEdgePriorityQueue(boundingStrategy, points);

  // this holds the nodes that need to still be explored
  // the data structure depends on the search strategy
  let toVisit = initializeToVisit(searchStrategy);
  const initialCost = 0;
  const initialPath = new Array(startingPoint);
  const initialLowerBound = calculateLowerBound(initialCost, initialPath, points, boundingStrategy, edges);
  toVisit.push(new TreeNode(initialCost, initialPath, initialLowerBound));

  let path = initialPath;
  let cost = initialCost;

  // this value marks the node that will be visited in the current while loop
  let currentNode = "";

  let currentRun = 0;    

  while (toVisit.size !== 0) {
    currentNode = toVisit.pop();
    path = currentNode.pathIncludingPoint;
    cost = currentNode.costToPoint;

    // the following displays the paths on the map
    self.setEvaluatingPaths(
      () => ({
        paths: [
          {
            path: path.slice(0, path.length - 1),
            color: EVALUATING_SEGMENT_COLOR
          },
          {
            path: path.slice(path.length - 2, path.length + 1),
            color: EVALUATING_ERROR_COLOR
          }
        ],
        cost
      }),
      2
    );
    await self.sleep();
   
    if (currentNode.lowerBound > overallBestCost || currentNode.costToPoint > overallBestCost) {
      // cases 1 & 2: minimumLowerBound > overallBestCost; currentCost > overallBestCost
      // node should be pruned, lower branches ignored (currentNode deleted & no new nodes added to toVisit)
    } else if (currentNode.pathIncludingPoint.length === points.length) {
      // case 3: finished path 
      //     case 3.1: cost > overallBestCost (already covered above)
      //     case 3.2: cost < overallBestCost
      let lastPointAddedToPath = currentNode.pathIncludingPoint[currentNode.pathIncludingPoint.length - 1];
      let costBackToStart = currentNode.costToPoint + distance(lastPointAddedToPath, startingPoint);
      let pathBackToStart =  [...currentNode.pathIncludingPoint, startingPoint];

      if (costBackToStart < overallBestCost) {
        overallBestCost = costBackToStart;
        overallBestPath = pathBackToStart;

        self.setBestPath(overallBestPath, overallBestCost);
      }
    } else {
    // case 4: unfinished path, but still worth searching 
    // (current node is already delete from toVisit, make sure node values are 
    // added to currentCost and currentPath! Then add next nodes to end of toVisit) 
      for (let i = 0; i < points.length; i++) {
        if (!hasPoint(currentNode.pathIncludingPoint, points[i])) { 
          let lastPointAddedToPath = currentNode.pathIncludingPoint[currentNode.pathIncludingPoint.length - 1];
          let distanceToNewNode = distance(lastPointAddedToPath, points[i])
          let costToNewPoint = currentNode.costToPoint + distanceToNewNode;
          let pathIncludingNewPoint = [...currentNode.pathIncludingPoint, points[i]];
          let newPointLowerBound = calculateLowerBound(costToNewPoint, pathIncludingNewPoint, points, boundingStrategy, edges);
          toVisit.push(new TreeNode(costToNewPoint, pathIncludingNewPoint, newPointLowerBound));
        }
      }
    }
    
    currentRun++;
  }

  // stop displaying evaluating path 
  path = initialPath;
  cost = initialCost;
  self.setEvaluatingPaths(
    () => ({
      paths: [
        {
          path: path.slice(0, path.length - 1),
          color: EVALUATING_SEGMENT_COLOR
        },
        {
          path: path.slice(path.length - 2, path.length + 1),
          color: EVALUATING_ERROR_COLOR
        }
      ],
      cost
    }),
    2
  );

  await self.sleep();

  console.log(overallBestPath);
  console.log(overallBestCost);


  return [overallBestCost, overallBestPath];
};

makeSolver(branchAndBoundOnCost);
