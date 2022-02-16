import axios from "axios";
import { Dispatch } from "redux";
import { Cell, RootState } from "..";
import bundler from "../../utils/bundler";

import { ActionType } from "../action-types";
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { CellType } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: { id, content },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return { type: ActionType.DELETE_CELL, payload: id };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const startBundling =
  (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: { cellId },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: { cellId, result },
    });
  };

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { data, order } = getState().cells;

    const cells = order.map((id) => data[id]);

    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
      }
    }
  };

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });
  try {
    const api = await axios.get("/cells");

    const cells: Cell[] = api.data;

    dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: cells });
  } catch (error) {
    if (error instanceof Error) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
    }
  }
};
