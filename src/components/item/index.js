import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";

function Item(props) {
  const cn = bem("Item");
  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("wrapper")}>
        <div className={cn("title")}>{props.item.title} </div>
        <div className={cn("info")}>
          <div className={cn("price")}>{`${props.item.price} ₽`}</div>
          {props.basket && (
            <div className={cn("quantity")}>{`${props.item.quantity} шт.`}</div>
          )}
        </div>
      </div>
      <Button
        onClickHandler={() => props.onClickHandler(props.item.code)}
        title={props.btn}
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onClickHandler: PropTypes.func,
  btn: PropTypes.string,
  basket: PropTypes.bool,
};

Item.defaultProps = {
  onClickHandler: () => {},
};

export default React.memo(Item);
