import { useRef } from "react";
import { RiCloseFill } from "react-icons/ri";

const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  const modalOverlayRef = useRef();

  const checkModalOverlay = (e) => {
    if (e.target === modalOverlayRef.current) {
      handleCloseModal();
    }
  };

  return isModalOpen ? (
    <div className="fixed left-0 top-0 z-10 h-full w-full backdrop-blur-sm  backdrop-brightness-50 ">
      <div
        onClick={checkModalOverlay}
        ref={modalOverlayRef}
        className="flex h-full items-center justify-center"
      >
        <div className="relative flex h-auto items-center justify-center rounded-lg bg-white">
          <RiCloseFill
            onClick={handleCloseModal}
            size="1.6rem"
            className="absolute right-3 top-3 cursor-pointer text-zinc-400 transition-colors hover:text-black"
          />
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
