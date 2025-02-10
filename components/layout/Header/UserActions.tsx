"use client";

import Modal from "@/components/ui/Modal";
import { actionsData } from "@/data/userActions";
import React, { useState } from "react";

const UserActions = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setActiveModal(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {actionsData.map((action) => (
          <button
            key={action.id}
            onClick={() => handleOpenModal(action.id)}
            className="text-[#ffffff] hover:text-[#FF9F0D] duration-300"
            aria-label={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>

      {actionsData.map((action) => (
        <Modal
          key={action.id}
          isOpen={activeModal === action.id}
          onClose={handleCloseModal}
        >
          {action.modalContent}
        </Modal>
      ))}
    </>
  );
};

export default UserActions;
