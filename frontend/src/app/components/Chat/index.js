import Component from './Chat';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { unreadMessages } from 'app/state/selectors/db/chat';
import { addMessage, loadChat, readMessage } from 'app/state/actions/db/messages';

const mapDispatchToProps = {
  loadChat,
  readMessage,
  addMessage,
};

const mapStateToProps = state => ({
  messages: state.db.scheme.chat.entities,
  unreadMessagesCount: unreadMessages(state.db.scheme.chat).length,
});

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
