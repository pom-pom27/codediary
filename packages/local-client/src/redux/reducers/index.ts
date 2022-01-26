import { combineReducers } from "redux";
import bundleReducer from "./bundles-reducer";
import cellReducer from "./cell-reducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
