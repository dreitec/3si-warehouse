import { UPDATE_PROGRAM_FILTERS, UPDATE_BY_TYPE } from "./types";

import { GeographicalEligibilityState, Filters } from "../interfaces";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_PROGRAM_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_BY_TYPE;
    };

export const reducer = (
  state: GeographicalEligibilityState,
  action: Action
): GeographicalEligibilityState => {
  switch (action.type) {
    case UPDATE_PROGRAM_FILTERS:
      return {
        ...state,
        programFilters: {
          ...state.programFilters,
          ...action.payload,
        },
      };
    case UPDATE_BY_TYPE:
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};
