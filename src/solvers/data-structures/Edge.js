export class Edge {
  constructor(pointA, pointB, lowerBound) {
    this.pointA = pointA 
    this.pointB = pointB
    this.lowerBound = lowerBound 
    this.next = null
  }
}
