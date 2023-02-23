import React, { useState } from "react";
import ReactModal from "react-modal";

import style from "./css/modal.module.css";

ReactModal.setAppElement("#root");

const Modal = ({ error }) => {
  const [showModal, setShowModal] = useState(error.errorStatus);
  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.3)" },
      }}
      className={style.modalContent}
    >
      <h1>Error Message</h1>
      <h3>{error.message}</h3>
      <button onClick={() => setShowModal(false)}>Close</button>
    </ReactModal>
  );
};

export default Modal;
