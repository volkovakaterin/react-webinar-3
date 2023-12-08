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

function Main() {
  const store = useStore();
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalog.loadPag(page, perPage);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    listPag: state.catalog.listPag,
    count: state.catalog.count,
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
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
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
        <Route path={`/product-page/${id}`} element={<ProductPage />} />
      </Routes>
      <Pagination
        itemsQnty={select.count}
        perPage={perPage}
        setPage={setPage}
        currentPage={page}
      />
    </PageLayout>
  );
}

export default memo(Main);
