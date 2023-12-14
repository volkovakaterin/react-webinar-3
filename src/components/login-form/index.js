import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

function LoginForm({ onAuth, auth, error }) {
  const navigate = useNavigate();
  const cn = bem("LoginForm");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // const handleClick = () => {
  //   navigate("/profile");
  // };

  // useEffect(() => {
  //   if (auth) {
  //     console.log();
  //     handleClick();
  //   }
  // }, [auth]);

  const callbacks = {
    onAuth: (e) => {
      e.preventDefault();
      onAuth(login, password);
      // if (auth) {
      navigate("/profile");
      // }
    },
  };

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Вход</h2>
      <form className={cn("form")} onSubmit={callbacks.onAuth}>
        <label className={cn("label")}>
          Логин
          <input
            type="text"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
        </label>
        <label className={cn("label")}>
          Пароль
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        {error && <div className={cn("error")}>{error}</div>}
        <button className={cn("login")} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default memo(LoginForm);
