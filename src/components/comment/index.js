import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Comment({ comment }) {
  const cn = bem("Comment");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>
        <span className={cn("username")}>{comment.author._type}</span>
        <span className={cn("date")}>{comment.dateCreate}</span>
      </h2>
      <div className={cn("content")}>{comment.text}</div>
      <button className={cn("reply")}>Ответить</button>
    </div>
  );
}

export default memo(Comment);
