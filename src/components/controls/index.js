import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
import { plural } from "../../utils";

function Controls({ onClickHandler, quantity, sum }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>В корзине:</h2>
      <div className={cn("info")}>
        {quantity ? (
          <>
            <div className={cn("quantity")}>
              {`${quantity} ${plural(quantity, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} /`}
            </div>
            <div className={cn("sum")}>{`${sum.toLocaleString()} ₽`}</div>
          </>
        ) : (
          "пусто"
        )}
      </div>
      <Button onClickHandler={onClickHandler} title="Перейти" />
    </div>
  );
}

Controls.propTypes = {
  onClickHandler: PropTypes.func,
  quantity: PropTypes.number,
  sum: PropTypes.number,
};

Controls.defaultProps = {
  onClickHandler: () => {},
};

export default React.memo(Controls);
