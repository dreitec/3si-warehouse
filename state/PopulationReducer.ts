import { UPDATE_FILTERS, UPDATE_OTHER_FILTERS } from "./types";
import { PopulationState, Filters } from "../src/frontend/Interfaces";

type Action = {
  payload: Filters;
  type: typeof UPDATE_FILTERS;
};

export const reducer = (
  state: PopulationState,
  action: Action
): PopulationState => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
