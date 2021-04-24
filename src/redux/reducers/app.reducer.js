import AppConstants from '../constants/app.constants';

const initialState = {
	spin: false,
};

export default function AppReducer(state = initialState, action) {
	switch (action.type) {
		case AppConstants.START_SPINNER:
			return {
				...state,
				spin: true,
			};
		case AppConstants.STOP_SPINNER:
			return {
				...state,
				spin: false,
			};
        default:
            return state;
	}
}
