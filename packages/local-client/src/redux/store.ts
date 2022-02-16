import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { saveMiddleware } from "./middlewares/save-middleware";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(saveMiddleware, thunk)
);
