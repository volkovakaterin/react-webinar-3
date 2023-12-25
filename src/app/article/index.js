import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import CommentsSection from "../../components/comments-section";
import commentsActions from "../../store-redux/comments/actions";
import useSelectorHook from "../../hooks/use-selector";
import commentsToTree from "../../utils/comments-to-tree";
import treeToList from "../../utils/tree-to-list";
import { useLocation, useNavigate } from "react-router-dom";

function Article() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selectStore = useSelectorHook(
    (state) => ({
      exists: state.session.exists,
      user: state.session.user,
    }),
    shallowequal
  );

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      comments: state.comments.data,
      waiting: state.article.waiting,
      waitingComment: state.comments.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const treeComments = useMemo(
    () =>
      treeToList(commentsToTree(select.comments, params.id), (item, level) => ({
        ...item,
        marginLeft: level < 5 ? 30 * level : 120,
      })),
    [select.comments]
  );

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={select.waitingComment}>
        <CommentsSection
          comments={treeComments}
          parent={params.id}
          exists={selectStore.exists}
          authUser={selectStore.user}
          onSignIn={callbacks.onSignIn}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
