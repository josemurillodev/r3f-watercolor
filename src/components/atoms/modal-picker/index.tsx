import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './style.scss';
import './transitions.scss';
import { FADE_MILLI } from './constants';

interface ModalPickerProps {
  children: ReactNode;
  isVisible?: boolean;
  className?: string;
  hideBackdrop?: boolean;
  toggleModal?(): void;
}

const ModalPicker = ({
  children,
  isVisible,
  className = '',
  hideBackdrop,
  toggleModal,
}: ModalPickerProps) => {
  const hourTransRef = useRef(null);
  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={hourTransRef}
      in={isVisible}
      timeout={FADE_MILLI}
      classNames="modalpicker__transition"
      unmountOnExit
      mountOnEnter
    >
      <div
        className={`modalpicker ${className}`}
        ref={hourTransRef}
        style={{ pointerEvents: hideBackdrop ? 'none' : 'auto' }}
      >
        {hideBackdrop ? null : (
          <button
            aria-label="Close"
            className="modalpicker__overlay"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            <span aria-hidden="true"> ×</span>
          </button>
        )}
        <div
          className="modalpicker__wrapper"
          style={{ pointerEvents: hideBackdrop ? 'all' : 'auto' }}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default ModalPicker;
