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

export function createEdgePriorityQueue(boundingStrategy, points) {
  let edges = new PriorityQueue();
  // create priority queue of edges ordered by cost (low to high). Only needed for cheapest edges bounding strategy
  // here, 
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

export function calculateLowerBound(costToPoint, pathIncludingPoint, points, boundingStrategy, edges) {
  if (boundingStrategy === "cheapestEdges") {
    // fügen Sie einfach nur die günstigsten, bisher nicht ausgewählten Kanten hinzu, bis Sie genauso viele Kanten selektiert haben, wie Knoten existieren.
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

export function initializeToVisit(searchStrategy) {
  if (searchStrategy === "lifo")
    var toVisit = new Stack();
  else if (searchStrategy === "fifo")
    var toVisit = new Queue();
  else if (searchStrategy === "mlb")
    var toVisit = new PriorityQueue();
  return toVisit;
}

