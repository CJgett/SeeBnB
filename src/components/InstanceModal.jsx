import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow 
} from "@material-ui/core";

import * as selectors from "../store/selectors";
import * as actions from "../store/actions";
import { distance as findDistance } from "../solvers/cost";

import { InformationModal } from "./InformationModal";

export const InstanceModal = props => {
  const dispatch = useDispatch();
  const open = useSelector(selectors.selectInstanceInfoOpen);
  const points = useSelector(selectors.selectPoints);
  const distanceMatrix = calculateDistanceMatrix(points);
  const myStyle = {
    marginBottom: '20px', 
  };
// create a 2D array and then fill it with the distances between each 
// destination. The distance from each point to itself is set to infinity
  function calculateDistanceMatrix(pointsArray) {
    let size = pointsArray.length;
    let matrix = new Array(size);
    for (let i = 0; i < size; i++) {
      matrix[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        if (i === j) {
          matrix[i][j] = 0;
        } else {
          let distanceValue = findDistance(points[i], points[j]);
          matrix[i][j] = Math.floor(distanceValue);
        }
      }
    }
    return matrix;
  }

  const onClose = () => {
    dispatch(actions.toggleInstanceInfoOpen());
  };

  return (
    <div>
        <InformationModal
          open={open}
          onClose={onClose}
        >
          <h1>Distance Matrix</h1>
          <Table style={myStyle}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                {points.map((point, headerIndex) => (
                  <TableCell key={headerIndex}>{`${headerIndex}`}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {points.map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{`${rowIndex}`}</TableCell>
                {distanceMatrix[rowIndex].map((distance, colIndex) => (
                <TableCell key={colIndex} dangerouslySetInnerHTML={{ __html: distance}}></TableCell>
              ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InformationModal>
    </div>
  );
};
