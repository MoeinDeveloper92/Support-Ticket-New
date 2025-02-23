// src/shared/Modal.tsx
import { ReactNode } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;
  return (
    <div className="fixed  z-20 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
