export class TreeNode {
  constructor(costToPoint, pathIncludingPoint, lowerBound) {
    this.costToPoint = costToPoint;
    this.pathIncludingPoint = pathIncludingPoint;
    this.lowerBound = lowerBound; 
    this.next = null;
  }
}
