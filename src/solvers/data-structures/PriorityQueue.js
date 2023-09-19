// use for mlb. Queue is sorted according to generalized cost value
// (called lowerBound, but can also be distance)
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
