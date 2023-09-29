import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import {
} from "@material-ui/core";

import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

import * as d3 from "d3";

import { InformationModal } from "./InformationModal";

export const ExpandedTreeModal = props => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const [treeShouldUpdate, setTreeShouldUpdate] = useState(true);

  const dataTreeFromBnB = useSelector(selectors.selectTree);
  const numNodes = useSelector(selectors.selectNumNodesExplored);
  const treeHeight = 1000;

  useEffect(() => {
    if(treeShouldUpdate) {
      var dataModal = dataTreeFromBnB;
      var rootModal = d3.hierarchy(dataModal);
      var treeLayoutModal = d3.tree()
        .size([800, 1000]);
      const treeHeight = rootModal.height * 300;
      treeLayoutModal(rootModal);
      // Nodes
      d3.select('svg g.nodes-modal')
        .selectAll('circle.node')
        .data(rootModal.descendants())
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
      d3.select('svg g.nodes-modal')
        .selectAll('text.label')
        .data(rootModal.descendants())
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
      d3.select('svg g.links-modal')
        .selectAll('line.link')
        .data(rootModal.links())
        .join('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;})
        .style("fill", "none")
        .style("stroke", `${theme.palette.text.secondary}`)
        .style("stroke-width", "1px");
    }

    if (numNodes > 750) {
      setTreeShouldUpdate(false);
    }

    if (numNodes === 0) {
      setTreeShouldUpdate(true);
    }
  }, [treeShouldUpdate, dataTreeFromBnB]);

  const open = useSelector(selectors.selectExpandedTreeOpen);
  const onClose = () => {
    dispatch(actions.toggleExpandedTreeOpen());
  };

  let showWarningIfLotsOfNodes;

  if (numNodes > 750) {
    showWarningIfLotsOfNodes = (<Typography 
            align="center" 
            display="inline"
            variant="subtitle2" 
            color="textSecondary">
            Stopped rendering tree: too many nodes! 
        </Typography>);
  }

  return (
    <div>
        <InformationModal
          open={open}
          onClose={onClose}
        >
          <h1>Expanded Tree</h1>
          <svg style={{ padding: 50 }} width="900" height={treeHeight}>
            <g transform="translate(0,9)">
              <g className="links-modal"></g>
              <g className="nodes-modal"></g>
            </g>
          </svg>
          {showWarningIfLotsOfNodes}
        </InformationModal>
    </div>
  );
};
