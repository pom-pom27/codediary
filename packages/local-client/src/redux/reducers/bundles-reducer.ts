import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initState: BundleState = {};

const bundleReducer = produce(
  (state: BundleState = initState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;

      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.result.code,
          error: action.payload.result.err,
        };
        return state;

      default:
        return state;
    }
  }
);
export default bundleReducer;
