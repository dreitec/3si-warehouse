import { UPDATE_SITE_FILTERS } from "./types";
import { ProvidersCapacityState, Filters } from "../src/frontend/Interfaces";

type Action = {
  payload: Filters;
  type: typeof UPDATE_SITE_FILTERS;
};
export const reducer = (
  state: ProvidersCapacityState,
  action: Action
): ProvidersCapacityState => {
  switch (action.type) {
    case UPDATE_SITE_FILTERS:
      return {
        ...state,
        siteFilers: {
          ...state.siteFilers,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
