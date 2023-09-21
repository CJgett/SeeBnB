import React from "react";
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import * as selectors from "../store/selectors";
import * as d3 from "d3";

export const NodeTree = () => {

  const theme = useTheme();

  const dataTreeFromBnB = useSelector(selectors.selectTree);
  var data = dataTreeFromBnB;
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
    .style("fill", "steelblue") // set node color 
    .style("stroke", function(d) {
    // Set stroke color based on exploring attribute
    if (d.data.exploring ==="yes")
      return "orange";
    else if (d.data.isCurrentBest ==="yes")
      return "red";
    else return `${theme.palette.text.secondary}`;
  }) // set outline color
    .style("stroke-width", "1.5px"); // set outline thickness

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
    .attr('font-size', '10px' )
    .style("fill", `${theme.palette.background.default}`) // set font color
    .style("font-weight", "500"); // set font color
  
  // Links (connections from node to node)
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
    .style("stroke", `${theme.palette.text.secondary}`)
    .style("stroke-width", "1px");

  return (
    <div>
      <svg width="400" height="220">
        <g transform="translate(0,9)">
          <g className="links"></g>
          <g className="nodes"></g>
        </g>
      </svg>
    </div>
  );
};

