import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function OptionsWrapper({ position, onClose, children }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const portalElement = document.querySelector(".portal-wrapper");
      if (portalElement && !portalElement.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={`portal-wrapper absolute w-[200px] overflow-hidden rounded-md bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.3)]`}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
