import { ModalRoot } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import Settings from './Settings';
import { MODAL_PAGE_SETTINGS } from '../constants/modal.constants';
import ModalActions from '../redux/actions/modal.actions';

const Modal = ({ activeModal, changeModal }) => {
  return (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => {
        changeModal();
      }}
    >
      <Settings id={MODAL_PAGE_SETTINGS} />
    </ModalRoot>
  );
};

const mapStateToProps = (state) => {
  return {
    activeModal: state.ModalReducer.modal_id,
  };
};

const mapDispatchToProps = {
  changeModal: ModalActions.changeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
