import React, { useState } from 'react';

import DraggableDialog from 'app/components/DraggableDialog';
import ChatHeader from 'app/components/Chat/ChatHeader/ChatHeader';
import ChatActions from 'app/components/Chat/ChatActionsl';
import ChatMessages from 'app/components/Chat/ChatMessages';

const Chat = () => {
  const [isOpen, setOpen] = useState(false);

  const close = setOpen.bind(null, false);

  return (
    <DraggableDialog
      open={isOpen}
      handleClose={close}
      title={ChatHeader}
      actions={ChatActions}
    >
      <ChatMessages
        messages={messages}
      />
    </DraggableDialog>
  );
};

export default Chat;
