import { UPDATE_ELIGIBILITY_FILTERS } from "./types";

import { EligibilityState, Filters } from "../types";

type Action = {
  payload: Filters;
  type: typeof UPDATE_ELIGIBILITY_FILTERS;
};
export const reducer = (
  state: EligibilityState,
  action: Action
): EligibilityState => {
  switch (action.type) {
    case UPDATE_ELIGIBILITY_FILTERS:
      return {
        ...state,
        eligibilityFilters: {
          ...state.eligibilityFilters,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
