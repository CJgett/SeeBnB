---
type: bounding-strategy 
order: 1
solverKey: cheapestEdges 
friendlyName: Cheapest Edges 
defaults:
  evaluatingDetailLevel: 2 
  maxEvaluatingDetailLevel: 2 
---

# Cheapest Edges
In this naive approach to relaxing the traveling salesman problem, the TSP is relaxed so that the graph resulting from this algorithm does not need to result in a single cycle. Furthermore, the resulting graph does not need to be complete, in other words not all nodes need to be connected to another node. The only requirement is to create a path that has as many edges as there are nodes to be visited n. To find the minimum distance for this path, simply sort the list of all edges by distance, then select the n edges with the lowest distance and calculate the sum of the distance costs of these edges. 

## Implementation

```javascript
export function calculateLowerBound(costToPoint, pathIncludingPoint, points, boundingStrategy, edges) {
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
    let nextEdge;
    while (edgesToAdd !== 0) {
      nextEdge = edgesCopy.pop()
      if (!containsEdge(pathIncludingPoint, nextEdge)) {
        cheapestEdgesLowerBound += nextEdge.cost; 
        edgesToAdd--;
      }
    }
    return cheapestEdgesLowerBound;
  }
```
