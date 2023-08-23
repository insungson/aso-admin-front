import { useEffect, useMemo, FC, ReactNode } from "react";
import { createPortal } from "react-dom";

const PopupWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(children, document.getElementById("modal-root"));
};

export default PopupWrapper;
