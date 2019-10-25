import React from 'react';

const ErrorNotification = ({errorMessage}) => {
  if (errorMessage === null) {
    return null;
  }
  return (
    <div className="error">
      <b>{errorMessage}</b>
    </div>
  );
};

export default ErrorNotification