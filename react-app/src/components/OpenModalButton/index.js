import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className={`modal-button ${className}`} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
