import { memo } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Product({ addToBasket, product }) {
  const { id } = useParams();
  const cn = bem("Product");

  const callbacks = {
    onAdd: (e) => addToBasket(id),
  };

  return (
    <div className={cn()}>
      {product && (
        <>
          <div className={cn("description")}>{product.description}</div>
          <div className={cn("country")}>
            Страна производитель:{" "}
            <span>{`${product.madeIn.title} (${product.madeIn.code})`}</span>
          </div>
          <div className={cn("category")}>
            Категория: <span>{product.category.title}</span>
          </div>
          <div className={cn("year")}>
            Год выпуска: <span>{product.edition}</span>
          </div>
          <div className={cn("price")}>
            Цена: <span>{product.price} ₽</span>
          </div>
          <button className={cn("add")} onClick={callbacks.onAdd}>
            Добавить
          </button>
        </>
      )}
    </div>
  );
}

export default memo(Product);
