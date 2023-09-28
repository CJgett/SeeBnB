---
type: search-strategy 
order: 1
solverKey: fifo 
friendlyName: Breadth First Search (FIFO) 
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Breadth First Search 
A common counterpart to DFS, Breadth First Search (BFS) chooses the node which was first added to the list as the next node, hence it is also known as first in, first out (FIFO). New nodes are appended to the end of the problem list, and the next node is plucked from the front, creating a tree which grows level-by-level.

For the branch and bound algorithm, this means that each time a new node should be added to a data structure for storage before it is explored, it is stored in a Queue. A new node can be stored at the end of the Queue as the new tail via the push function and the oldest node in the Queue can be removed from the start, or head, via push. 


## Implementation
```javascript
export class Queue {

  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }

  push(node) {
    if(this.head === null) {
      this.head = node;
      this.last = node;
    } else {
      let oldLast = this.last;
      this.last = node;
      oldLast.next = node;
    }
    return ++this.size;
  }
  
  pop() {
    let prevHead = this.head;
    // queue has only one object and will be empty
    if(this.head === this.last) { 
      this.last = null;
    }
    this.head = this.head.next;
    this.size--;
    return prevHead;
  }
}
```
