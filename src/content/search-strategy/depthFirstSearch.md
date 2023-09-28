---
type: search-strategy 
order: 1
solverKey: lifo
friendlyName: Depth First Search (LIFO) 
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Depth First Search 
When employing Depth-First Search (DFS), also known as last in, first out (LIFO), the node that was last added to the tree is chosen as the next to be explored. This leads to a tree where the depth is explored first.

For the branch and bound algorithm, this means that each time a new node should be added to a data
structure for storage before it is explored, it is stored in a Stack. A new node can be stored at
the top of the Stack as the new head via the push function and removed from the Stack via pop. 

## Implementation
```javascript
export class Stack {

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
      let oldHead = this.head; 
      this.head = node;
      this.head.next = oldHead;
    }
    return ++this.size;
  }

  pop() {
    if(this.head === null) 
      return null;
    let prevHead = this.head;
    // stack has only one object and will be empty
    if(this.head === this.last) {
      this.last = null;
    }
    this.head = this.head.next;
    this.size--;
    return prevHead;
  }

}
```
