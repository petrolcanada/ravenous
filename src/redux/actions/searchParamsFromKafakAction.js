import { SEARCH_PARAMS_FROM_KAFKA } from "../constants";

const searchParamsFromKafkaAction = payload => {
    console.log(payload);
  return { type: SEARCH_PARAMS_FROM_KAFKA, payload };
};

export default searchParamsFromKafkaAction;
