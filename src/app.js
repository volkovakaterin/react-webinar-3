import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const quantity = store.getState().quantity;
  const sum = store.getState().sum;
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    onDeleteProduct: useCallback(
      (code) => {
        store.deleteProduct(code);
      },
      [store]
    ),

    onAddProduct: useCallback(
      (code) => {
        store.addProduct(code);
      },
      [store]
    ),

    handlerModalActive: useCallback(() => {
      setModalActive(!modalActive);
    }),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onClickHandler={callbacks.handlerModalActive}
        quantity={quantity}
        sum={sum}
      />
      <List
        list={list}
        onClickHandler={callbacks.onAddProduct}
        btn={"Добавить"}
      />
      <Modal active={modalActive}>
        <Basket
          onCloseModal={callbacks.handlerModalActive}
          onDeleteProduct={callbacks.onDeleteProduct}
          products={basket}
          sum={sum}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
