import { memo, useCallback, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function Textarea(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem("Textarea");
  return (
    <textarea
      className={cn()}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Textarea.defaultProps = {
  onChange: () => {},
};

export default memo(Textarea);
