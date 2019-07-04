import { UPDATE_SEARCH_PARAMS } from "../constants";

const updateSearchParamsAction = payload => {
  return { type: UPDATE_SEARCH_PARAMS, payload };
};

export default updateSearchParamsAction;
