import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {portalElement ? ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement) : null}
      { portalElement ? ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement) : null}
    </Fragment>
  );
};

export default Modal;
