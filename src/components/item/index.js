import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => {
      props.onAdd(props.item._id);
    },
    onTitle: (e) => {
      e.preventDefault();
      props.handlerTitle(props.item.title);
    },
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={`/product-page/${props.item._id}`}
        className={cn("title")}
        onClick={(e) => callbacks.handlerTitle(e)}
      >
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
