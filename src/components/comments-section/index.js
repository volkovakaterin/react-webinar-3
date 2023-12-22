import { memo, useState, useCallback, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import { Link } from "react-router-dom";
import FormComment from "../form-comment";

function CommentsSection({ comments, parent, auth }) {
  const cn = bem("CommentsSection");
  const [data, setData] = useState({
    comment: "",
  });

  console.log("Комментарии", comments);

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
      },
      [data]
    ),
  };

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии({comments.length})</h3>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      {!auth ? (
        <div className={cn("signin")}>
          <Link className={cn("link")} to={"/login"}>
            Войдите
          </Link>
          <span className={cn("text")}>
            , чтобы иметь возможность комментировать
          </span>
        </div>
      ) : (
        <FormComment parent={parent} />
      )}
    </div>
  );
}

export default memo(CommentsSection);
