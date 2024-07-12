import React, { useState, useEffect } from 'react';

const Snackbar = ({ message, variant = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), duration);

    return () => clearTimeout(timeout);
  }, [message, duration]);

  const handleClose = () => {
    setIsVisible(false);
    //if (onClose) onClose(); // Call provided onClose function if available
  };

  const classes = `snackbar snackbar-${variant} ${isVisible ? 'show' : ''}`;

  return (
    <div className={classes}>
      <p>{message}</p>
      {onClose && <button type="button" onClick={handleClose}>Close</button>}
    </div>
  );
};

export default Snackbar;
