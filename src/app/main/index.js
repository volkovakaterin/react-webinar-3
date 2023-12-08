import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductPage from "../../components/product-page";

function Main() {
  const store = useStore();
  const location = useLocation().pathname;
  const [page, setPage] = useState(1);
  const perPage = 10;
  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.setTitle("Магазин");
  }, []);

  useEffect(() => {
    store.actions.catalog.loadPag(page, perPage);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    listPag: state.catalog.listPag,
    count: state.catalog.count,
    title: state.catalog.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    handlerSetTitle: useCallback(
      (title) => store.actions.catalog.setTitle(title),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            handlerSetTitle={callbacks.handlerSetTitle}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route
          path="/"
          element={<List list={select.listPag} renderItem={renders.item} />}
        />
        <Route
          path={`/product-page/:id`}
          element={<ProductPage addToBasket={callbacks.addToBasket} />}
        />
      </Routes>
      {location === "/" && (
        <Pagination
          itemsQnty={select.count}
          perPage={perPage}
          setPage={setPage}
          currentPage={page}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
