import { UPDATE_PROGRAM_FILTERS, UPDATE_OTHER_FILTERS } from "./types";
import { FiltersBaseState, Filters } from "../src/frontend/Interfaces";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_PROGRAM_FILTERS;
    }
  | {
      payload: Filters;
      type: typeof UPDATE_OTHER_FILTERS;
    };

export const reducer = (
  state: FiltersBaseState,
  action: Action
): FiltersBaseState => {
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
