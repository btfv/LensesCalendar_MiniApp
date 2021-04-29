import UserConstants from '../constants/user.constants';

const initialState = { data: {} };

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
            ...state.data.lenses,
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
            ...state.data.liquid,
            swapDates: [...state.data.liquid.swapDates, action.newDate],
          },
        },
      };
    case UserConstants.ADD_DATA_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          lenses: {
            ...state.data.lenses,
            ...action.data.lenses,
          },
          liquid: {
            ...state.data.liquid,
            ...action.data.liquid,
          },
        },
      };
    default:
      return state;
  }
}
