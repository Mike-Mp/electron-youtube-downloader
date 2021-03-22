import React, { ReactElement } from 'react';

const MsgBox = ({ message }: { message: string }): ReactElement | null => {
  if (message.length > 0) {
    let typeOfMessage;
    if (message.startsWith('Error:')) {
      typeOfMessage = 'error';
    } else if (message.startsWith('Info:')) {
      typeOfMessage = 'info';
    } else {
      typeOfMessage = 'downloader';
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
