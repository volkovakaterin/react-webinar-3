import { memo, useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useParams } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

function ProductPage(id) {
  const cn = bem("ProductPage");
  const store = useStore();
  useEffect(() => {
    store.actions.catalog.loadProduct(id);
  }, [id]);

  const select = useSelector((state) => ({
    product: state.catalog.product,
  }));

  console.log(select.product);

  return (
    <div className={cn()}>
      <div className={cn("description")}></div>
      <div className={cn("country")}></div>
      <div className={cn("category")}></div>
      <div className={cn("year")}></div>
      <div className={cn("price")}></div>
      <button className={cn("add")}>Добавить</button>
    </div>
  );
}

export default memo(ProductPage);
