import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
} from "./types";

import {
  GeographicalFiltersBaseState,
  Filters,
} from "../src/frontend/Interfaces";

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

export const reducer = (
  state: GeographicalFiltersBaseState,
  action: Action
): GeographicalFiltersBaseState => {
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
    case UPDATE_BY_TYPE:
      return {
        ...state,
        selectedOption: action.payload,
      };
    case UPDATE_FILTER_TYPE:
      return {
        ...state,
        selectedFilterType: action.payload,
      };
    default:
      return state;
  }
};
