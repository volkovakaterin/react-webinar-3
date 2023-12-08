import { memo, useCallback, useState, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Route, Routes } from "react-router-dom";
import ProductPage from "../product-page";
import Home from "../home";

function Main() {
  const store = useStore();
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.loadPag(page, perPage);
  }, [page]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    //Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    handlerTitle: useCallback((title) => {
      setTitle(title);
    }, []),
  };

  return (
    <PageLayout>
      <Head title={title || "Магазин"} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home
                handlerTitle={callbacks.handlerTitle}
                addToBasket={callbacks.addToBasket}
                perPage={perPage}
                setPage={setPage}
                page={page}
              />
            </>
          }
        />
        <Route
          path="/product-page/:id"
          element={
            <ProductPage
              addToBasket={callbacks.addToBasket}
              handlerTitle={callbacks.handlerTitle}
            />
          }
        />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
