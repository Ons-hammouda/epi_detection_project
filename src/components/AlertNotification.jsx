import React from 'react';

const AlertNotification = ({ show }) => {
  if (!show) return null;

  return (
    <div style={{ color: 'red', fontWeight: 'bold' }}>
      ⚠️ Une alerte a été envoyée !
    </div>
  );
};

export default AlertNotification;