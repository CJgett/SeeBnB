import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from "@material-ui/core";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    flex: "1",
    overflow: "auto",
  }
}));

const columns = [
  { id: 'runID', label: 'Run ID', minWidth: 50 },
  { id: 'runDetails', label: 'Run Details', minWidth: 50 },
  { id: 'solution', label: 'Solution', minWidth: 50 },
  { id: 'runtime', label: 'Runtime', minWidth: 50 },
  { id: 'instance', label: 'Instance', minWidth: 50 },
  { id: 'evalNodes', label: 'Nodes Evaluated', minWidth: 50 },
  { id: 'maxTreeDepth', label: 'Max Tree Depth', minWidth: 50 },
];

function createData(runID, runDetails, solution, runtime, instance, evalNodes, maxTreeDepth) {
  return { runID, runDetails, solution, runtime, instance, evalNodes, maxTreeDepth };
}

const rows = [
  createData(1, 'none, BFS, 1-1', 159, 6, 24, 4, 5),
];

export const SavedRuns = props => {

  const classes = useStyles();

  return (
    <MenuSection>
      <MenuItem title="Previous Runs" className={classes.item}
       sx={{ width: '100%', overflow: 'hidden' }}>
         <TableContainer sx={{ maxHeight: 440 }}>
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
    </MenuSection>
  );
};
