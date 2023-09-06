import { createStore, applyMiddleware, compose } from "redux"; // Note the addition of `compose`
import thunk from "redux-thunk";
import reducer from "./reducer";

// Check if the Redux DevTools extension is available in the browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store with the DevTools extension
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
