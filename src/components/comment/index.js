import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useCallback, useState } from "react";
import correctDate from "../../utils/correct-date";

function Comment({ comment, exists, handlerSetReply, authUser }) {
  const cn = bem("Comment");

  const callbacks = {
    setReply: useCallback(() => {
      if (exists) {
        handlerSetReply(comment._id);
      }
    }),
  };

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>
        <span
          className={cn("username", {
            gray: authUser._id && authUser._id == comment.author._id,
          })}
        >
          {comment.author.profile.name}
        </span>
        <span className={cn("date")}>{correctDate(comment.dateCreate)}</span>
      </h2>
      <div className={cn("content")}>{comment.text}</div>
      <button className={cn("reply")} onClick={callbacks.setReply}>
        Ответить
      </button>
    </div>
  );
}

export default memo(Comment);
