import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "./types";

import { TableState, Filters } from "../interfaces";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_PROGRAM_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_BY_TYPE;
    }
  | {
      payload: string;
      type: typeof UPDATE_FILTER_TYPE;
    }
  | {
      payload: Filters;
      type: typeof UPDATE_OTHER_FILTERS;
    };

export const reducer = (state: TableState, action: Action): TableState => {
  switch (action.type) {
    case UPDATE_PROGRAM_FILTERS:
      return {
        ...state,
        programFilters: {
          ...state.programFilters,
          ...action.payload,
        },
      };
    case UPDATE_OTHER_FILTERS:
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
