import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AuthHead(props) {
  const cn = bem("AuthHead");
  const navigate = useNavigate();

  const callbacks = {
    onLogout: (e) => {
      e.preventDefault();
      navigate("/login");
      if (props.auth) {
        props.onLogout();
      }
      return;
    },
  };

  return (
    <div className={cn()}>
      {props.auth && (
        <Link to={"/profile"} className={cn("username")}>
          {props.username}
        </Link>
      )}
      <button className={cn("login")} onClick={callbacks.onLogout}>
        {props.auth ? "Выход" : "Вход"}
      </button>
    </div>
  );
}

AuthHead.propTypes = {
  onLogout: PropTypes.func,
};

export default memo(AuthHead);
