import { BUSINESSES_RECEIVED } from '../constants';
const businessesReceivedAction = (payload) => {
    return { type: BUSINESSES_RECEIVED, payload };
}
export default businessesReceivedAction;
