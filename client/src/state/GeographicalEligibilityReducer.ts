import {
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS,
  UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE,
} from "./types";

import { GeographicalEligibilityState, Filters } from "../types";

type Action =
  | {
      payload: Filters;
      type: typeof UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS;
    }
  | {
      payload: string;
      type: typeof UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE;
    };

export const reducer = (
  state: GeographicalEligibilityState,
  action: Action
): GeographicalEligibilityState => {
  switch (action.type) {
    case UPDATE_GEOGRAPHICAL_ELIGIBILITY_FILTERS:
      return {
        ...state,
        geographicalEligibilityFilters: {
          ...state.geographicalEligibilityFilters,
          ...action.payload,
        },
      };
    case UPDATE_GEOGRAPHICAL_ELIGIBILITY_BY_TYPE:
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};
