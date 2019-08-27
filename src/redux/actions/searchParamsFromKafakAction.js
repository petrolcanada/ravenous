import { SEARCH_PARAMS_FROM_KAFKA } from "../constants";

const searchParamsFromKafkaAction = payload => {
  return { type: SEARCH_PARAMS_FROM_KAFKA, payload };
};

export default searchParamsFromKafkaAction;
