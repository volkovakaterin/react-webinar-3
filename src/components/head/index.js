import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";

function Head(props) {
  const cn = bem("Head");
  return (
    <div
      className={cn({ brdRadius: props.brdRadius })}
      style={{ marginBottom: `${props.marginBtm}px` }}
    >
      <h1>{props.title}</h1>
      {props.btn && (
        <Button onClickHandler={props.onCloseModal} title={props.btn} />
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  btn: PropTypes.string,
  brdRadius: PropTypes.bool,
  marginBtm: PropTypes.string,
  oncloseModal: PropTypes.func,
};

Head.defaultProps = {
  oncloseModal: () => {},
};

export default React.memo(Head);
