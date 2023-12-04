import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes, { number } from "prop-types";
import "./style.css";
import Head from "../head";
import List from "../list";

function Basket(props) {
  const cn = bem("Basket");
  return (
    <div className={cn()}>
      <Head
        title="Корзина"
        btn="Закрыть"
        onCloseModal={props.onCloseModal}
        brdRadius={true}
        marginBtm="71"
      />
      <List
        list={props.products}
        onClickHandler={props.onDeleteProduct}
        btn={"Удалить"}
        basket={true}
      />
      {props.products.length > 0 ? (
        <div className={cn("total")}>
          <div className={cn("title")}>Итого</div>
          <div className={cn("sum")}>{`${props.sum.toLocaleString()} ₽`}</div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

Basket.propTypes = {
  onCloseModal: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  sum: PropTypes.number,
};

Basket.defaultProps = {
  onCloseModal: () => {},
  onDeleteProduct: () => {},
};

export default React.memo(Basket);
