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
export function createEdgePriorityQueue(boundingStrategy, points) {
  let edges = new PriorityQueue();
    if (boundingStrategy === "cheapestEdges") {
    let pointsAsArray = Array.from(points);
    for (let i = 0; i < pointsAsArray.length; i++) {
      for (let j = i+1; j < pointsAsArray.length; j++) {
        let pointA = pointsAsArray[i];
        let pointB = pointsAsArray[j];
        let edgeToAdd = new Edge(pointA, pointB, distance(pointA, pointB));
        edges.push(edgeToAdd);
      }
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
  else if (boundingStrategy === "singleCycleTree") {
    return 0;
    // TODO 
  }
  // boundingStrategy === "singleCycleTreeWithAscent" 
  else {
    //TODO
    return 0;
  }
}

// returns whether a given path array contains an edge value
export function containsEdge(path, edge) {
  let edgePointA = edge.pointA;
  let edgePointB = edge.pointB;
  for (let i = 0; i < path.length - 1 ; i++) {
    if ((edgePointA === path[i] && edgePointB === path[i+1] ) || (edgePointA === path[i+1] && edgePointB === path[i])) {
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
