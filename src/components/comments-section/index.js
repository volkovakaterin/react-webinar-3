import { memo, useState, useCallback, useEffect, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import FormComment from "../form-comment";

function CommentsSection({ comments, parent, exists, authUser, onSignIn }) {
  const cn = bem("CommentsSection");
  const [reply, setReply] = useState(null);

  const handlerSetReply = (id) => {
    setReply(id);
  };

  const callbacks = {
    signIn: useCallback(() => {
      onSignIn();
    }),
  };

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии({comments.length})</h3>
      {comments &&
        comments.map((comment) => (
          <div
            className={cn("comment")}
            key={comment._id}
            style={{ marginLeft: `${comment.marginLeft}px` }}
          >
            <Comment
              comment={comment}
              exists={exists}
              handlerSetReply={handlerSetReply}
              authUser={authUser}
            />
            {comment._id === reply && (
              <FormComment
                parent={comment._id}
                handlerSetReply={handlerSetReply}
                theme="comment"
                articleID={parent}
              />
            )}
          </div>
        ))}
      {!exists ? (
        <div className={cn("signin")}>
          <span className={cn("link")} onClick={callbacks.signIn}>
            Войдите
          </span>
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
