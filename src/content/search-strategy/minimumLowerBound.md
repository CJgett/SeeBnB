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
A variant of Best First Search, in this strategy, the next node to be examined is always the node with the smallest lower bound. This is based on the idea that following the smallest lower bound might allow the algorithm to be more likely to reach the actual optimum more quickly than other search strategies. When using this search strategy, there is a possibility for memory problems when compared to DFS/LIFO, however, the first incumbent solution found is generally close to the final optimum

In the context of the branch and bound algorithm, this means that each time a new node should be added to a data structure for storage before it is explored, it is stored in a PriorityQueue. A new node can be sorted into the the Priority Queue based on its lower bound value via the push function. The pop function provides the node with the lowest lower bound before removing it from the Priority Queue. 


## Implementation
```javascript
export class PriorityQueue {
  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }

  push(node) {
    // case: pq is empty
    if(this.head === null) {
      this.head = node;
      this.last = node;
    }
    // case: pq has one entry. Insert node either before or after node and update head/last accordingly
    else if (this.head === this.last) {
      if (this.head.lowerBound < node.lowerBound) {
        this.head.next = node;
        this.last = node;
      } else {
        let prevHead = this.head
        this.head = node
        this.head.next = prevHead
        this.last = prevHead
      }
    // case: pq has more than one entry. find before insertion point. edge cases: insertion point is head/last
    } else {
      let beforeInsert = this.head;
      let afterInsert = this.head.next;
      let headsOrTails = 0;
      while(afterInsert !== null && afterInsert.lowerBound < node.lowerBound) {
        beforeInsert = beforeInsert.next;
        afterInsert = afterInsert.next;
        ++headsOrTails;
      }
      if (headsOrTails === 0 && beforeInsert.lowerBound > node.lowerBound) {
        this.head = node;
        this.head.next = beforeInsert;
      } else if (headsOrTails === this.size - 1) {
        beforeInsert.next = node;
        this.last = node;
      } else {
        beforeInsert.next = node;
        node.next = afterInsert;
      }
    }
    return ++this.size;
  }

  pop() {
    let prevHead = this.head;
    if (this.head === null)
      return null;
    // priority queue has only one object and will be empty
    if(this.head === this.last) {
      this.last = null;
    }  
    this.head = this.head.next;
    this.size--;
    return prevHead;
  }

  copy() {
    let priorityQueueCopy = new PriorityQueue();
    let nodeToCopy = this.head;
    while(nodeToCopy !== null) {
      priorityQueueCopy.push(nodeToCopy);
      nodeToCopy = nodeToCopy.next;
    }
    priorityQueueCopy.head = this.head;
    priorityQueueCopy.last = this.last;
    return priorityQueueCopy;
  }
}
```
