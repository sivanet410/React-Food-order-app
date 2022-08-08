import React, { Fragment } from "react";
import ReactDom from "react-dom";
import Classes from "./Modal.module.css";

const Backdrop = props => {
  return <div className={Classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlays = props => {
  return (
    <div className={Classes.modal}>
      <div className={Classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = props => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
