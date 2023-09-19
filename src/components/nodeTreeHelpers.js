export function findNodeWithPath(path, tree) {
  if (pointsAreEqual(tree.path[0], path[0]))
    return tree;
  let nodeToFind = tree;
  for (let i = 1; i < path.length; i++) {
    for (let j = 0; j < nodeToFind.children.length; j++) {
      if (path[i].value === nodeToFind.children[j].name) {
        nodeToFind = nodeToFind.children[j];
        continue;
     }
  }
  return nodeToFind;
  }
}

export function pointsAreEqual(pointA, pointB) {
  if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
    return true;
  }
}

export function makeNode(name, cost, path) {
  return {"name" : name,
          "cost" : cost,
          "path" : path,
          "children": []};
}

