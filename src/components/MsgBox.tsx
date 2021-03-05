import React, { ReactElement } from 'react';

const MsgBox = ({ message }: { message: string }): ReactElement | null => {
  console.log(`MSGBOX: ${message}`);
  if (message.length > 0) {
    let typeOfMessage;
    if (message.includes('Error:')) {
      typeOfMessage = 'error';
    } else {
      typeOfMessage = 'info';
    }

    return (
      <div className={`${typeOfMessage}Box`}>
        <h6>{message}</h6>
      </div>
    );
  }

  return null;
};

export default MsgBox;
