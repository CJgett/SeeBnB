---
type: bounding-strategy 
order: 1
solverKey: currentCost 
friendlyName: Current Cost 
defaults:
  evaluatingDetailLevel: 2 
  maxEvaluatingDetailLevel: 2 
---

# Current Cost
Even more naive than Cheapest Edges, in this strategy, the current lower bound for each node is set to the current cost of the path to
that node. This works because if a city were to be appended to the path after this node, the path distance
after the addition must be at least as long as after the addition, therefore the current distance to
the node can act as a very naive lower bound.
