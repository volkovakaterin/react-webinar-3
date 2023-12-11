import { memo, useEffect, useCallback } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Product from "../../components/product";

const ProductPage = memo(({ addToBasket }) => {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    console.log(id);
    store.actions.catalog.loadProduct(id);
  }, [id]);

  const select = useSelector((state) => ({
    product: state.catalog.product,
    title: state.catalog.title,
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
  };

  return (
    <PageLayout>
      <Head title={select.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Product addToBasket={callbacks.addToBasket} product={select.product} />
    </PageLayout>
  );
});

export default memo(ProductPage);
