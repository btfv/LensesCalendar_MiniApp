import ModalConstants from '../constants/modal.constants';

const initialState = {
  modal_id: null,
};

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case ModalConstants.CHANGE_MODAL:
      return {
        ...state,
        modal_id: action.modal_id,
      };
    default:
      return state;
  }
}
