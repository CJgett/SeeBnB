import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useAlgorithmInfo } from "../hooks";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

import { InformationModal } from "./InformationModal";

export const AlgorithmModals = props => {
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedInitialSolution = useSelector(selectors.selectInitialSolution);
  const selectedSearchStrategy = useSelector(selectors.selectSearchStrategy);
  const selectedBoundingStrategy = useSelector(selectors.selectBoundingStrategy);
  const selectedAlgorithmType = useSelector(selectors.selectAlgorithmType);
  const open = useSelector(selectors.selectAlgInfoOpen);

  function selectedAlgorithm() {
    if (selectedAlgorithmType === "initial-solution")
      return selectedInitialSolution; 
    else if (selectedAlgorithmType === "search-strategy")
      return selectedSearchStrategy; 
    else if (selectedAlgorithmType === "bounding-strategy")
      return selectedBoundingStrategy;
  };

  const onClose = () => {
    dispatch(actions.toggleAlgInfoOpen());
  };

  return (
    <>
      {algorithms.filter(alg => alg.type === selectedAlgorithmType)
        .map(alg => (
        <InformationModal
          key={alg.solverKey}
          open={open && selectedAlgorithm() === alg.solverKey}
          onClose={onClose}
        >
          <div dangerouslySetInnerHTML={{ __html: alg.html }} />
        </InformationModal>
      ))}
    </>
  );
};
