---
type: bounding-strategy 
order: 1
solverKey: oneTree 
friendlyName: 1-Tree (Kruskal) 
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2 
---

# 1-Tree (Kruskal)
One approach that does come closer to the optimum solution is to use a 1-tree, formed
including the path to the current node, as the lower bound. This 1-tree is the answer to
a relaxation problem which requires a graph that is complete and includes a single cycle,
but does not require that all nodes be visited exactly once, which means that not all nodes
need to be part of this single cycle (although they can be) [4].

One way to begin the process of creating a 1-tree is via Kruskal’s Algorithm, a type of
greedy algorithm which outputs a minimum spanning tree. This minimum spanning tree is by definition the combination of those edges which results in a complete graph at
the lowest distance. This graph can then be expanded upon to create a 1-tree by simply
adding a single edge (the next cheapest edge) to create the required cycle.

The input of Kruskal’s algorithm requires an undirected and weighted graph environment.
This is achieved in the TSP with the distance as the weight for each edge and, since the
cost of each edge is considered in this example to be equal in both directions (Berlin to
Munich is the same distance as Munich to Berlin), graphs resulting from this problem are
also undirected. As stated previously, the resulting output of this algorithm is a minimum
spanning tree. To achieve a minimum spanning tree with one cycle, the shortest path
from one city to another that is not currently included in the spanning tree is added to
the graph

To calculate the lower bound with Kruskal for a path that already includes more than one
city, the start and end points of the path as well as any nodes in the cities to be visited which are
not already part of the path are used to construct an MST with Kruskal.


## Implementation

```javascript
export function calculateLowerBound(costToPoint, pathIncludingPoint, points, boundingStrategy, edges) {
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

```
