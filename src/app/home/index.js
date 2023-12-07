import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Home(setProductId) {
  const store = useStore();
  const [page, setPage] = useState(1);
  const perPage = 10;

  store.actions.catalog.countCatalog();

  useEffect(() => {
    store.actions.catalog.load(page, perPage);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    countCatalog: state.catalog.countCatalog,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
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
            setProductId={setProductId}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        itemsQnty={select.countCatalog}
        perPage={perPage}
        setPage={setPage}
        currentPage={page}
      />
    </>
  );
}

export default memo(Home);
