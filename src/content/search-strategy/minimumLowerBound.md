---
type: search-strategy 
order: 1
solverKey: mlb 
friendlyName: Minimum Lower Bound (MLB) 
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Minimum Lower Bound 
A variant of Best First Search[7], in this strategy, the next node to be examined is always the node with the smallest lower bound B. This is based on the idea that following the smallest lower bound might allow the algorithm to be more likely to reach the actual optimum more quickly than other search strategies. When using this search strategy, there is a possibility for memory problems when compared to DFS/LIFO, however, the first incumbent solution found is generally close to the final optimum

## Implementation
[comment]: <> (TODO insert code) 
```javascript
console.log("this time its MLB");
```
