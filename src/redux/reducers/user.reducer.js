import UserConstants from '../constants/user.constants';

const initialState = {
	data: {
		lenses: {
			name: null,
			changeDates: [],
			periodicity: null,
			manufacturer: null,
			dioptreLeft: null,
			dioptreRight: null,
			curvatureLeft: null,
			curvatureRight: null,
		},
		liquid: {
			name: null,
			changeDates: [],
			manufacturer: null,
		},
	},
};

export default function UserReducer(state = initialState, action) {
	switch (action.type) {
		case UserConstants.DATA_SUCCESS:
			return {
				...state,
				data: action.data,
			};
		default:
			return state;
	}
}
