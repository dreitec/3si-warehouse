import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_VIEW_BY,
  UPDATE_SITE_FILTERS,
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
    }
  | {
      payload: Filters;
      type: typeof UPDATE_SITE_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_VIEW_BY;
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
    case UPDATE_SITE_FILTERS:
      return {
        ...state,
        siteFilters: {
          ...state.siteFilters,
          ...action.payload,
        },
      };

    case UPDATE_VIEW_BY:
      return {
        ...state,
        selectedViewBy: action.payload,
      };
    default:
      return state;
  }
};
