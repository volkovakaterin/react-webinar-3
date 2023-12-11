import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import List from "../../components/list";
import Item from "../../components/item";

function Main() {
  const store = useStore();
  const perPage = 10;

  useEffect(() => {
    store.actions.catalog.loadPag(perPage);
  }, [store.state.catalog.currentPage]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    listPag: state.catalog.listPag,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    //Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    //Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    onSetCurrentPage: useCallback(
      (number) => store.actions.catalog.setCurrentPage(number),
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
      <List list={select.listPag} renderItem={renders.item} />
      <Pagination
        itemsQnty={select.count}
        perPage={perPage}
        setPage={callbacks.onSetCurrentPage}
        currentPage={select.currentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
