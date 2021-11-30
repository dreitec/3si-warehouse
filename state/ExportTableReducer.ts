import {
  UPDATE_PROGRAM_FILTERS,
  UPDATE_BY_TYPE,
  UPDATE_FILTER_TYPE,
  UPDATE_OTHER_FILTERS,
  UPDATE_VIEW_BY,
  UPDATE_SITE_FILTERS,
  UPDATE_EXPORTING,
} from "./types";

import { ITableState, Filters } from "../src/frontend/Interfaces";

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
    }
  | {
      payload: boolean;
      type: typeof UPDATE_EXPORTING;
    };

export const reducer = (state: ITableState, action: Action): ITableState => {
  console.log(action, state);
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
    case UPDATE_EXPORTING:
      console.log("should update");
      return {
        ...state,
        exporting: action.payload,
      };
    default:
      return state;
  }
};
