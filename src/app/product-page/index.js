import { memo, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

const ProductPage = memo(({ addToBasket }) => {
  const { id } = useParams();
  const cn = bem("ProductPage");
  const store = useStore();

  useEffect(() => {
    console.log(id);
    store.actions.catalog.loadProduct(id);
  }, [id]);

  const select = useSelector((state) => ({
    product: state.catalog.product,
  }));

  return (
    <div className={cn()}>
      {select.product && (
        <>
          <div className={cn("description")}>{select.product.description}</div>
          <div className={cn("country")}>
            Страна производитель:{" "}
            <span>{`${select.product.madeIn.title} (${select.product.madeIn.code})`}</span>
          </div>
          <div className={cn("category")}>
            Категория: <span>{select.product.category.title}</span>
          </div>
          <div className={cn("year")}>
            Год выпуска: <span>{select.product.edition}</span>
          </div>
          <div className={cn("price")}>
            Цена: <span>{select.product.price} ₽</span>
          </div>
          <button
            className={cn("add")}
            onClick={(e) => {
              addToBasket(id);
            }}
          >
            Добавить
          </button>
        </>
      )}
    </div>
  );
});

export default memo(ProductPage);
