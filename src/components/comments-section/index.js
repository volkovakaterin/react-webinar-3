import { memo, useState, useCallback, useEffect, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import { Link } from "react-router-dom";
import FormComment from "../form-comment";
import commentsToTree from "../../utils/comments-to-tree";

function CommentsSection({ comments, parent, exists }) {
  const cn = bem("CommentsSection");
  const [reply, setReply] = useState(null);

  const handlerSetReply = (id) => {
    setReply(id);
  };

  console.log("Комментарии", comments);

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии({comments.length})</h3>
      {comments &&
        comments.map((comment) => (
          <>
            <Comment
              key={comment._id}
              comment={comment}
              exists={exists}
              handlerSetReply={handlerSetReply}
            />
            {comment._id === reply && (
              <FormComment
                parent={comment._id}
                handlerSetReply={handlerSetReply}
                theme="comment"
              />
            )}
          </>
        ))}
      {!exists ? (
        <div className={cn("signin")}>
          <Link className={cn("link")} to={"/login"}>
            Войдите
          </Link>
          <span className={cn("text")}>
            , чтобы иметь возможность комментировать
          </span>
        </div>
      ) : (
        reply === null && <FormComment parent={parent} theme="article" />
      )}
    </div>
  );
}

export default memo(CommentsSection);
