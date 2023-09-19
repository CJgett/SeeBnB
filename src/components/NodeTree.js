import React, { Component } from "react";
import * as d3 from "d3";
import { findNodeWithPath, makeNode } from "./nodeTreeHelpers";

class NodeTree extends Component {

  componentDidMount() {

    const rootNode = makeNode("0", 200, [[39, 20]]);
    const secondNode = makeNode("1", 3, [[39, 20], [19, 52]]);
    const thirdNode = makeNode("2", 208, [[39, 20], [67, 9]]);
    
    var data = rootNode;
    data.children.push(secondNode);
    findNodeWithPath([[39, 20]], data).children.push(thirdNode);

    console.log(data);

    var treeLayout = d3.tree()
      .size([400, 200]);

    var root = d3.hierarchy(data);

    treeLayout(root);

    // Nodes
    d3.select('svg g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .join('circle')
      .classed('node', true)
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', 8)
      .style("fill", "steelblue")
      .style("stroke", "orange")
      .style("stroke-width", "2px")

    // Text Label in Node
    d3.select('svg g.nodes')
      .selectAll('text.label')
      .data(root.descendants())
      .join('text')
      .classed('label', true)
      .text(function(d) { return d.data.name; }) // Set the text content to the 'name' property
      .attr('x', function(d) { return d.x; }) // Set the x-coordinate for text
      .attr('y', function(d) { return d.y; }) // Set the y-coordinate for text
      .attr('text-anchor', 'middle') // Center the text horizontally
      .attr('dy', '0.35em') 
      .attr('font-size', '10px' );
    
    // Links
    d3.select('svg g.links')
      .selectAll('line.link')
      .data(root.links())
      .join('line')
      .classed('link', true)
      .attr('x1', function(d) {return d.source.x;})
      .attr('y1', function(d) {return d.source.y;})
      .attr('x2', function(d) {return d.target.x;})
      .attr('y2', function(d) {return d.target.y;})
      .style("fill", "none")
      .style("stroke", "white")
      .style("stroke-width", "1px");
      
      
  }

  render() {

    return (
      <div>
        <svg width="400" height="220">
          <g style={{ paddingTop: '10px' }} transform="translate(5, 5)">
            <g className="links"></g>
            <g className="nodes"></g>
          </g>
        </svg>
      </div>
    );
  }
}

export default NodeTree;
