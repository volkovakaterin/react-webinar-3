import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import Authorization from "../../containers/authorization";

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    auth: state.auth.auth,
    error: state.auth.error,
  }));

  const callbacks = {
    // Авторизация
    onAuth: useCallback(
      (login, password) => store.actions.auth.auth(login, password),
      [store]
    ),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Authorization />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        onAuth={callbacks.onAuth}
        auth={select.auth}
        error={select.error}
      />
    </PageLayout>
  );
}

export default memo(Login);
