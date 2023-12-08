import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

const Home = memo(({ handlerTitle, addToBasket, page, perPage, setPage }) => {
  const store = useStore();

  console.log(page, perPage);

  console.log(store);

  store.actions.catalog.countCatalog();

  useEffect(() => {
    handlerTitle("Магазин");
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.listPag,
    countCatalog: state.catalog.countCatalog,
  }));

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item item={item} onAdd={addToBasket} handlerTitle={handlerTitle} />
        );
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
});

export default memo(Home);
