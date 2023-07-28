import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { appSlice } from "./app/slice";
import thunkMiddleware from "redux-thunk";

export const rootReducer = combineReducers({
  app: appSlice.reducer,
});

// QUESTION: Why would we use thunk middleware? What advantage does this give us?
// ANSWER: ==================👇👇
// Thunk middleware is used in Redux for handling asynchronous actions.
//   Advantages 👇
//It allows dispatching functions (thunks) as actions, which helps with async operations like API calls.
// Thunks delay dispatching actions, enabling async tasks before updating the store.
// Thunks are written in a simple, synchronous style, making code easier to read.
// Thunks receive dispatch and getState functions, offering access to the store and allowing multiple or conditional actions.

//  ANSWER END HERE =========>
const composedEnhancer = applyMiddleware(thunkMiddleware);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [composedEnhancer],
  devTools: true,
});
