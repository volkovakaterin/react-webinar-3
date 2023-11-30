import { useEffect, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ children, active }) {
  const [confirmDocument, setDocument] = useState();

  const cn = bem("Modal");

  const child = <div className={cn({ active: active })}>{children}</div>;

  useEffect(() => {
    setDocument(document);
    if (!active) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [active]);

  return confirmDocument && createPortal(child, confirmDocument.body);
}

Modal.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
};

export default React.memo(Modal);
