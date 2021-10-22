import { UPDATE_ELIGIBILITY_FILTERS } from "./types";
import { FiltersBaseState, Filters } from "../interfaces";

type Action = {
  payload: Filters;
  type: typeof UPDATE_ELIGIBILITY_FILTERS;
};

export const reducer = (
  state: FiltersBaseState,
  action: Action
): FiltersBaseState => {
  switch (action.type) {
    case UPDATE_ELIGIBILITY_FILTERS:
      return {
        ...state,
        programFilters: {
          ...state.programFilters,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
