import { PriorityQueue } from "../data-structures/PriorityQueue";
import { Queue } from "../data-structures/Queue";
import { Stack } from "../data-structures/Stack";
import { TreeNode } from "../data-structures/TreeNode";
import { Edge } from "../data-structures/Edge";
import { distance } from "../cost";

export function hasPoint(path, point) {
  for(let i = 0; i < path.length; i++) {
    if(
      (path[i][0] === point[0] && path[i][1] === point[1]) || 
      (path[i][0] === point[1] && path[i][1] === point[0])) {
      return true; }
  }
  return false;
}

// create priority queue of edges ordered by cost (low to high). Only needed for cheapest edges bounding strategy
export function createEdgePriorityQueue(points) {
  let edges = new PriorityQueue();
    let pointsAsArray = Array.from(points);
    for (let i = 0; i < pointsAsArray.length; i++) {
      for (let j = i+1; j < pointsAsArray.length; j++) {
        let pointA = pointsAsArray[i];
        let pointB = pointsAsArray[j];
        let edgeToAdd = new Edge(pointA, pointB, distance(pointA, pointB));
        edges.push(edgeToAdd);
    }
  }
  return edges;
} 

// returns the lower bound for the given path and cost
// gives an anwswer to the question, 
export function calculateLowerBound(costToPoint, pathIncludingPoint, points, boundingStrategy, edges) {
  if (boundingStrategy === "none") {
  }
  if (boundingStrategy === "cheapestEdges") {
    if(pathIncludingPoint.length === points.length){
      return costToPoint;
    }
    // Add the cheapest edges that are not yet part of the given path, 
    // until as many edges have been selected as there are nodes. 
    let cheapestEdgesLowerBound = costToPoint;
    let edgesToAdd = (points.length) - (pathIncludingPoint.length - 1);
    let startCheckingHere = 0;
    let edgesCopy = edges.copy();
    let nextEdge = "";
    while (edgesToAdd !== 0) {
      nextEdge = edgesCopy.pop()
      if (!containsEdge(pathIncludingPoint, nextEdge)) {
        // although it's called "nextEdge.lowerBound", this is the distance cost for this edge!
        cheapestEdgesLowerBound += nextEdge.lowerBound; 
        edgesToAdd--;
      }
    }
    return cheapestEdgesLowerBound;
  }
  else if (boundingStrategy === "oneTree") {

    if(pathIncludingPoint.length === points.length){
      return costToPoint;
    }
    // this implementation of Kruskal uses a simplified union/find tactic
    let oneTreeLowerBound = costToPoint;
    let edgesToAdd = (points.length) - (pathIncludingPoint.length - 1);
    let edgesCopy = edges.copy();
    let currentEdge = "";
    let pointsToBuildMST = selectMSTPoints(pathIncludingPoint, points);
    const pointToIndexMap = new Map();
    // save the values of pointsToBuild in a map, index -> point
    pointsToBuildMST.forEach((point, index) => pointToIndexMap.set(point.join(','), index));
    let groupRepArray = [];
    // initialize the group representative for each point to be included in the MST. At the start, every point is its own representative
    pointsToBuildMST.forEach((point, index) => groupRepArray[index] = index);

    let counter = 0;

    while (edgesToAdd !== 0) {
      counter++;
      currentEdge = edgesCopy.pop();
      if(edgeIncludesForbiddenPoint(pointsToBuildMST, currentEdge)) {
        // in this case, the currentEdge contains at least one point on the inner part of the current path, which we don't want to use for the MST.
        continue;
      }
      if(pathIncludingPoint.length === 2 && containsEdge(pathIncludingPoint, currentEdge)) {
        // edge case: even though we would normally ignore the portion of the current path between the start and end node by not including these points in the creation of the MST, in the case of the current path containing just two nodes, this edge needs to be manually ignored.
        continue;
      }
      if(nodesAreConnected(currentEdge, groupRepArray, pointToIndexMap)) {
        // nodes have the same group rep and are therefore connected through some path already. Adding this edge would create a cycle, which we don't want!
          continue;
      }
      // updating one of the point's group rep to the point's group rep connects the two groups
      updateGroupReps(currentEdge, groupRepArray, pointToIndexMap);
      // add the edge to the mst, but we only need the lower bound, so just calculate this.
      // currentEdge.lowerBound is actually the cost of the edge!
      oneTreeLowerBound += currentEdge.lowerBound;
      edgesToAdd--;
    }
    return oneTreeLowerBound;
  }
  // could add: boundingStrategy === "oneTreeWithAscent" 
  else {
    return 0;
  }
}
function updateGroupReps(edge, groupRepArray, pointToIndexMap) {
  const firstPointID = pointToIndexMap.get(edge.pointA.join(',')); 
  const secondPointID = pointToIndexMap.get(edge.pointB.join(','));
  const firstPointGroupRepID = findGroupRep(firstPointID, groupRepArray);
  const secondPointGroupRepID = findGroupRep(secondPointID, groupRepArray);
  groupRepArray[firstPointGroupRepID] = secondPointGroupRepID;
}

function nodesAreConnected(edge, groupRepArray, pointToIndexMap) {
  const firstPointID = pointToIndexMap.get(edge.pointA.join(',')); 
  const secondPointID = pointToIndexMap.get(edge.pointB.join(','));
  const firstPointGroupRepID = findGroupRep(firstPointID, groupRepArray);
  const secondPointGroupRepID = findGroupRep(secondPointID, groupRepArray);
  if (firstPointGroupRepID === secondPointGroupRepID) {
    return true;
  }
  return false;
}

function findGroupRep(pointID, groupRepArray) {
  let currentPointID = pointID;
  while (currentPointID !== groupRepArray[pointID]) {
    currentPointID = groupRepArray[pointID];
  }
  return currentPointID;
}
function edgeIncludesForbiddenPoint(pointsToUse, edge) {
  if (!hasPoint(pointsToUse, edge.pointA) || !hasPoint(pointsToUse, edge.pointB)) {
    return true;
  }
  return false;
}
function pointsAreEqual(pointA, pointB) {
  if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
    return true;
  }
  else return false;
}
function selectMSTPoints(path, allPoints) {
  if(path.length === 1) {
    return allPoints;
  }
  let selectedPoints = [];
  if(path.length === allPoints.length) {
    return selectedPoints;
  }
  for (let i = 0; i < allPoints.length; i++) {
    if (!hasPoint(path, allPoints[i]))
      selectedPoints.push(allPoints[i]);
  }
  selectedPoints.push(path[0]);
  selectedPoints.push(path[path.length - 1]);
  return selectedPoints;
}
// returns whether a given path array contains an edge value
export function containsEdge(path, edge) {
  let edgePointA = edge.pointA;
  let edgePointB = edge.pointB;
  for (let i = 0; i < path.length - 1 ; i++) {
    if ((pointsAreEqual(edgePointA, path[i]) && pointsAreEqual(edgePointB, path[i+1])) || (pointsAreEqual(edgePointA, path[i+1]) && pointsAreEqual(edgePointB, path[i]))) {
        return true;
    }
  }
  return false;
}

// create the toVisit structure to hold nodes that still need to be explored
// exact data structure type depends on the search strategy
export function initializeToVisit(searchStrategy) {
  if (searchStrategy === "lifo")
    var toVisit = new Stack();
  else if (searchStrategy === "fifo")
    var toVisit = new Queue();
  else if (searchStrategy === "mlb")
    var toVisit = new PriorityQueue();
  return toVisit;
}

//
// NODE TREE (displayed in bottom section)
//

// creates a map containing point-name pairs given an array of points 
// this is used to give the nodes their names (shown as labels inside nodes)
export function createPointToNameMap(points) {
  var map = new Map();
  var uniquePointString;
  for(let i = 0; i < points.length; i++) {
    uniquePointString = points[i].join(',');
    map.set(uniquePointString, i.toString());
  }
  return map;
}

// find a node in the node tree given a path
export function findNodeWithPath(path, tree, pointToNameMap) {
  if (path.length === 1)
    return tree;
  let nodeToFind = tree;
  for (let i = 1; i < path.length; i++) {
    for (let j = 0; j < nodeToFind.children.length; j++) {
      if (pointToNameMap.get(path[i].join(',')) === nodeToFind.children[j].name) {
        nodeToFind = nodeToFind.children[j];
        break;
      }
    }
  }
  return nodeToFind;
}

export function makeNode(name, cost, path, exploring, isCurrentBest) {
  return {
    "name" : name,
    "cost" : cost,
    "path" : path,
    "exploring" : exploring,
    "isCurrentBest" : isCurrentBest,
    "children": []
  };
}
