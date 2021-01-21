import { extractDaily } from "./api";

export const stateReducer = (state: fetchedDataType, action: Action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...action.payload,
        where: "Global",
      };
    case "COUNTRY_CHANGE":
      return {
        ...state,
        ...extractDaily(
          action.payload === "Global"
            ? state.worldChart
            : state.data[action.payload]
        ),
        where: action.payload,
      };
    default:
      return state;
  }
};
