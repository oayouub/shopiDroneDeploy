'use client';

import React from 'react';
import './notification.scss';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification; 