import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ itemsQnty, perPage, setPage, currentPage }) {
  const cn = bem("Pagination");
  const pagesQnty = Math.ceil(itemsQnty / perPage);
  const pageNumber = [];

  pageNumber.push(1, pagesQnty);
  if (currentPage <= 2) {
    pageNumber.splice(1, 0, 2, 3, "...");
  } else if (currentPage >= pagesQnty - 1) {
    pageNumber.splice(1, 0, "...", pagesQnty - 2, pagesQnty - 1);
  } else if (currentPage > 3 && currentPage < pagesQnty - 2) {
    pageNumber.splice(
      1,
      0,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "..."
    );
  } else if (currentPage === 3) {
    pageNumber.splice(
      1,
      0,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "..."
    );
  } else if (currentPage === pagesQnty - 2) {
    pageNumber.splice(
      1,
      0,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1
    );
  }

  return (
    <div className={cn()}>
      {pageNumber.map((number, index) => (
        <div
          className={
            typeof number === "number"
              ? number === currentPage
                ? cn("page", "active")
                : cn("page")
              : cn("ellipses")
          }
          key={index}
          onClick={() => typeof number === "number" && setPage(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  itemsQnty: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  setPage: () => {},
};

export default memo(Pagination);
