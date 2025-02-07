import { X } from "lucide-react";
import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            aria-label="Close"
          >
            <X />
          </button>

          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
