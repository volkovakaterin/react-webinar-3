import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function UserProfile({ username, phone, email }) {
  const cn = bem("UserProfile");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Профиль</h2>
      <ul className={cn("info")}>
        <li>
          <span>Имя: </span>
          <span>{username}</span>
        </li>
        <li>
          <span>Телефон: </span>
          <span>{phone}</span>
        </li>
        <li>
          <span>email: </span>
          <span>{email}</span>
        </li>
      </ul>
    </div>
  );
}

export default memo(UserProfile);
