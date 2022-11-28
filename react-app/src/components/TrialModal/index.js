import React, { useState } from "react";
import { Modal } from "../../components/context/Modal";
import TrialUpdateForm from "../UpdateTrialForm/TrialUpdateForm";

function TrialUpdateModal({trial}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update Trial</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TrialUpdateForm trial={trial}/>
        </Modal>
      )}
    </>
  );
}

export default TrialUpdateModal;
