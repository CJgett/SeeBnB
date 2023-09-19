// use for fifo/bfs 
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
