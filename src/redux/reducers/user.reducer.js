import UserConstants from '../constants/user.constants';

const initialState = {
  data: {
    lenses: {
      name: null,
      swapDates: [],
      periodicity: null,
      manufacturer: null,
      dioptreLeft: null,
      dioptreRight: null,
      curvatureLeft: null,
      curvatureRight: null,
    },
    liquid: {
      name: null,
      swapDates: [],
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
    case UserConstants.SWAP_LENSES_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          lenses: {
            ...state.lenses,
            swapDates: [...state.data.lenses.swapDates, action.newDate],
          },
        },
      };
    case UserConstants.SWAP_LIQUID_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          liquid: {
            ...state.liquid,
            swapDates: [...state.data.liquid.swapDates, action.newDate],
          },
        },
      };
    default:
      return state;
  }
}
