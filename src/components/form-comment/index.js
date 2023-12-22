import { memo, useState, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import Textarea from "../textarea";
import commentsActions from "../../store-redux/comments/actions";
import { useDispatch } from "react-redux";

function FormComment({ parent }) {
  const cn = bem("FormComment");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    text: "",
    parent: { _id: parent, _type: "article" },
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value) => {
      setData((prevData) => ({ ...prevData, text: value }));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        console.log(data);
        dispatch(commentsActions.add(data));
      },
      [data]
    ),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <label className={cn("label")}>
        Новый комментарий
        <Textarea
          value={data.login}
          onChange={callbacks.onChange}
          placeholder="Текст"
        />
      </label>
      <button className={cn("submit")} type="submit">
        Отправить
      </button>
    </form>
  );
}

export default memo(FormComment);
