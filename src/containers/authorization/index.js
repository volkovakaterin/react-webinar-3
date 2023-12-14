import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import AuthHead from "../../components/auth-head";

function Authorization() {
  const store = useStore();

  const select = useSelector((state) => ({
    auth: state.auth.auth,
    username: state.auth.profile.username,
  }));

  const callbacks = {
    //Выход
    onLogout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  return (
    <AuthHead
      onLogout={callbacks.onLogout}
      auth={select.auth}
      username={select.username}
    />
  );
}

export default memo(Authorization);
