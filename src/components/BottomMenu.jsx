import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Divider } from "@material-ui/core";
import { CurrentRunTree } from "./CurrentRunTree";
import { SavedRuns } from "./SavedRuns";

// The resize functionality of this component was modified from Moises CM's (username: fenderOne) CodeSandBox: 
// https://codesandbox.io/s/sad-butterfly-1fwo4?file=/src/index.js
// The use of this code is covered by the MIT license. 
// The full license text can be found in the root of this project.

const useStyles = makeStyles(theme => ({
  wrapper: {
    flex: "1"
  },
  paper: {
    overflowY: "scroll",
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    zIndex: "100",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  },
  resizer: {
    height: '10px',
    backgroundColor: `${theme.palette.action.selected}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'ns-resize',
    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"10\"><path d=\"M0 2 h30 M0 5 h30 M0 8 h30\" fill=\"none\" stroke=\"black\"/></svg>')",
  } 
}));

export const BottomMenu = () => {
  
  const classes = useStyles();

  function manageResize(e) {
    var posProp = "pageY";
    var sizeProp = "offsetHeight";
    var resizer = e.target;
    console.log(resizer);

    var map = resizer.parentElement.previousElementSibling;
    var bottomMenu = resizer.nextElementSibling;
    if (!map || !bottomMenu) {
      return;
    }

    e.preventDefault();

    var mapSize = map[sizeProp];
    var bottomMenuSize = bottomMenu[sizeProp];
    var lastPos = e[posProp];

    // when the cursor is moved after the mousedown event, resize the two components 
    function onMouseMove(mm) {
      var pos = mm[posProp];
      var d = pos - lastPos;
      mapSize += d;
      bottomMenuSize -= d;
      if (mapSize < 0) {
        bottomMenuSize += mapSize;
        pos -= mapSize;
        mapSize = 0;
      }
      if (bottomMenuSize < 0) {
        mapSize += bottomMenuSize;
        pos += bottomMenuSize;
        bottomMenuSize = 0;
      }

      map.style.height = mapSize + "px";
      bottomMenu.style.height = bottomMenuSize + "px";

      lastPos = pos;
    }

    // on mouseup, stop resizing
    function onMouseUp(mu) {
      // Change cursor to signal a state's change: stop resizing.
      const html = document.querySelector('html');
      html.style.cursor = 'default';
      console.log("mouse up");

      resizer.style.cursor = 'ns-resize';
      
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

  }
  
  
  function setupResizerEvents(event) {
console.log("mousedown");
      // Used to avoid cursor's flickering
      const html = document.querySelector('html');
      
      event.target.style.cursor = 'row-resize';
      html.style.cursor = 'row-resize'; // avoid cursor's flickering

      manageResize(event);
  }

  return (
  <div className={ classes.wrapper }>  
    <div onMouseDown={setupResizerEvents} className={classes.resizer}></div>
    <Paper classes={{ root: classes.paper }} >
      <CurrentRunTree />
      <Divider orientation='vertical' />
      <SavedRuns />
    </Paper>
  </div>
  );
};
