import {
  UPDATE_GEOGRAPHICAL_SERVED_FILTERS,
  UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE,
} from "./types";

import { GeographicalFiltersBaseState, Filters } from "../interfaces";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_GEOGRAPHICAL_SERVED_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE;
    };

export const reducer = (
  state: GeographicalFiltersBaseState,
  action: Action
): GeographicalFiltersBaseState => {
  switch (action.type) {
    case UPDATE_GEOGRAPHICAL_SERVED_FILTERS:
      return {
        ...state,
        programFilters: {
          ...state.programFilters,
          ...action.payload,
        },
      };
    case UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE:
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};
