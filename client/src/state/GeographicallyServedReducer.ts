import {
  UPDATE_GEOGRAPHICAL_SERVED_FILTERS,
  UPDATE_GEOGRAPHICAL_SERVED_BY_TYPE,
} from "./types";

import { GeographicalServedState, Filters } from "../interfaces";

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
  state: GeographicalServedState,
  action: Action
): GeographicalServedState => {
  switch (action.type) {
    case UPDATE_GEOGRAPHICAL_SERVED_FILTERS:
      return {
        ...state,
        geographicalServedFilters: {
          ...state.geographicalServedFilters,
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
