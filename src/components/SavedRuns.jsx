import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../store/selectors";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { makeStyles } from "@material-ui/styles";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  container: {
    display:"flex",
  }, 
  button: {
    alignSelf: "flex-start",
    marginTop: "55px"
  }
}));

const columns = [
  { id: 'runID', label: 'Run ID', minWidth: 50 },
  { id: 'runDetails', label: 'Run Details', minWidth: 50 },
  { id: 'solution', label: 'Solution', minWidth: 50 },
  { id: 'instance', label: 'Instance', minWidth: 50 },
  { id: 'evalNodes', label: 'Nodes Evaluated', minWidth: 50 },
];

export const SavedRuns = props => {

  const dispatch = useDispatch();

  const runTable = useSelector(selectors.selectRunTable);
  const rows = runTable;
  
  function onResetTable() {
    dispatch(actions.resetRunTable());
  }

  const classes = useStyles();

  return (
    <MenuSection>
      <div className={ classes.container }>
      <MenuItem title="Previous Runs" sx={{ width: '100%', overflow: 'hidden' }}>
         <TableContainer >
           <Table stickyHeader aria-label="sticky table">
             <TableHead>
               <TableRow>
                 {columns.map((column) => (
                   <TableCell
                     key={column.id}
                     style={{ minWidth: column.minWidth }}
                   >
                     {column.label}
                   </TableCell>
                 ))}
               </TableRow>
             </TableHead>
             <TableBody>
               {rows
                 .map((row) => {
                   return (
                     <TableRow hover role="checkbox" tabIndex={-1} key={row.runID}>
                       {columns.map((column) => {
                         const value = row[column.id];
                         return (
                           <TableCell key={column.id}>
                             {value}
                           </TableCell>
                         );
                       })}
                     </TableRow>
                   );
                 })}
             </TableBody>
           </Table>
         </TableContainer> 
       </MenuItem>
       <Button onClick={onResetTable} classes={{ root:classes.button }}>
         <FontAwesomeIcon icon={faRedo} width="0" />
       </Button>
       </div>
    </MenuSection>
  );
};
