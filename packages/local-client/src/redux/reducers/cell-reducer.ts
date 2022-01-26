import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellReducerState {
  order: string[];
  loading: boolean;
  error: string | null;
  data: { [key: string]: Cell };
}

const initState: CellReducerState = {
  loading: false,
  order: [],
  error: null,
  data: {},
};

const cellReducer = produce(
  (state: CellReducerState = initState, action: Action): CellReducerState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;

        //find the index of the cell
        const index = state.order.findIndex((id) => id === action.payload.id);

        //set the target (1 cell at a time)
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        //swapping index to targetIndex

        // [state.order[index], state.order[targetIndex]] = [
        //   state.order[targetIndex],
        //   state.order[index],
        // ];

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];

        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        //set to data
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;

        //insert into order

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        //insert the id to order
        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default cellReducer;
