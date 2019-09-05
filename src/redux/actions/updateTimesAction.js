import { UPDATE_TIMES } from '../constants';

const updateTimesAction = payload => {
    return { type: UPDATE_TIMES, payload };
}

export default updateTimesAction;