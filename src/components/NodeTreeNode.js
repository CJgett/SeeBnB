export class NodeTreeNode {
  constructor(uniqueName, name, costToPoint) {
    this.name = name;
    this.cost = costToPoint;
    this.children = [];
  }
}
