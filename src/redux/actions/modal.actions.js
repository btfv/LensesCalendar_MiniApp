import ModalConstants from '../constants/modal.constants';
const ModalActions = {};

ModalActions.changeModal = (modal_id) => ({
  type: ModalConstants.CHANGE_MODAL,
  modal_id : modal_id || null,
});

export default ModalActions;
