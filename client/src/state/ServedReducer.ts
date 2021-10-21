import { UPDATE_SERVED_FILTERS } from "./types";
import { ServedState, Filters } from "../interfaces";

type Action = {
  payload: Filters;
  type: typeof UPDATE_SERVED_FILTERS;
};

export const reducer = (state: ServedState, action: Action): ServedState => {
  switch (action.type) {
    case UPDATE_SERVED_FILTERS:
      return {
        ...state,
        servedFilters: {
          ...state.servedFilters,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
