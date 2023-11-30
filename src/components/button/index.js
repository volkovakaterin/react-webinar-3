import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Button({ onClickHandler, title }) {
  const cn = bem("Button");
  return (
    <button className={cn()} onClick={() => onClickHandler()}>
      {title}
    </button>
  );
}

Button.propTypes = {
  onClickHandler: PropTypes.func,
  title: PropTypes.string,
};

Button.defaultProps = {
  onClickHandler: () => {},
};

export default React.memo(Button);
