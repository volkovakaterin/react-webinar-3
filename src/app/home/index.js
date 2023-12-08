import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Home({ handlerTitle, addToBasket }) {
  const store = useStore();
  const [page, setPage] = useState(1);
  const perPage = 10;

  store.actions.catalog.countCatalog();

  useEffect(() => {
    store.actions.catalog.load(page, perPage);
    handlerTitle("Магазин");
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    countCatalog: state.catalog.countCatalog,
  }));

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={addToBasket} />;
      },
      [addToBasket]
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
