// use for lifo/dfs
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
