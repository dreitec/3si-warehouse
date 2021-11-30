import { UPDATE_FILTERS } from "./types";
import { GapsState, Filters } from "../src/frontend/Interfaces";

type Action = {
  payload: Filters;
  type: typeof UPDATE_FILTERS;
};

export const reducer = (state: GapsState, action: Action): GapsState => {
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
