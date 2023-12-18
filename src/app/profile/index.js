import { memo, useCallback, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserProfile from "../../components/user-profile";
import Authorization from "../../containers/authorization";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";

function Profile() {
  const store = useStore();

  const select = useSelector((state) => ({
    username: state.auth.profile.username,
    phone: state.auth.profile.phone,
    email: state.auth.profile.email,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Authorization />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserProfile
          username={select.username}
          phone={select.phone}
          email={select.email}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
