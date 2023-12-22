import { memo, useState, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import Textarea from "../textarea";
import commentsActions from "../../store-redux/comments/actions";
import { useDispatch } from "react-redux";

function FormComment({ parent, handlerSetReply, theme, articleID }) {
  const cn = bem("FormComment");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    text: "",
    parent: { _id: parent, _type: theme },
  });

  const callbacks = {
    onChange: useCallback((value) => {
      setData((prevData) => ({ ...prevData, text: value }));
    }, []),

    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        dispatch(
          commentsActions.add(data, theme === "comment" ? articleID : parent)
        );
      },
      [data]
    ),

    handlerSetReply: useCallback(() => {
      handlerSetReply(null);
    }),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <label className={cn("label")}>
        Новый комментарий
        <Textarea
          value={data.text}
          onChange={callbacks.onChange}
          placeholder="Текст"
        />
      </label>
      <div>
        <button className={cn("submit")} type="submit">
          Отправить
        </button>
        {theme === "comment" && (
          <button
            className={cn("button")}
            type="button"
            onClick={callbacks.handlerSetReply}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default memo(FormComment);
