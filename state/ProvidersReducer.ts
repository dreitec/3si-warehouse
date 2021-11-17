import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_SITE_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_SEARCH_QUERY,
} from "./types";
import { ProvidersState, Filters } from "../src/frontend/Interfaces";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_PROGRAM_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_FILTER_TYPE;
    }
  | {
      payload: Filters;
      type: typeof UPDATE_OTHER_FILTERS;
    }
  | {
      payload: Filters;
      type: typeof UPDATE_SITE_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_BY_TYPE;
    }
  | {
      payload: string;
      type: typeof UPDATE_SEARCH_QUERY;
    };

export const reducer = (
  state: ProvidersState,
  action: Action
): ProvidersState => {
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
    case UPDATE_SITE_FILTERS:
      return {
        ...state,
        siteFilers: {
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
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};
