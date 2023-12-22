export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    console.log(id);
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?limit=*&skip=0&fields=*`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result, id },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  add: (data) => {
    console.log(data);
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: "/api/v1/comments?lang=ru&fields=*",
          method: "POST",
          body: JSON.stringify(data),
        });

        dispatch({
          type: "comments/add-success",
        });
      } catch (e) {
        //Ошибка
        console.log("ошибка добавления коммента");
        console.error(e);
        dispatch({ type: "comments/add-error" });
      }
    };
  },
};
