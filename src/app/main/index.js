import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { Route, Routes } from "react-router-dom";
import ProductPage from "../product-page";
import Home from "../home";
import { useParams } from "react-router-dom";

function Main() {
  const store = useStore();
  const { title } = useParams();
  const [productId, setProductId] = useState(null);
  // const [page, setPage] = useState(1);
  // const perPage = 10;

  // store.actions.catalog.countCatalog();

  // useEffect(() => {
  //   store.actions.catalog.load(page, perPage);
  // }, [page]);

  const select = useSelector((state) => ({
    // list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    // countCatalog: state.catalog.countCatalog,
  }));

  console.log(select.list);

  const callbacks = {
    // Добавление в корзину
    // addToBasket: useCallback(
    //   (_id) => store.actions.basket.addToBasket(_id),
    //   [store]
    // ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  // const renders = {
  //   item: useCallback(
  //     (item) => {
  //       return <Item item={item} onAdd={callbacks.addToBasket} />;
  //     },
  //     [callbacks.addToBasket]
  //   ),
  // };

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
              <Home setProductId={setProductId} />
            </>
          }
        />
        <Route
          path="/product-page/:title/:id"
          element={<ProductPage id={productId} />}
        />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
