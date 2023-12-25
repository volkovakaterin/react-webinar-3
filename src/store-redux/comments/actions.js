export const load = (id) => {
  return async (dispatch, getState, services) => {
    // Установка признака ожидания загрузки
    dispatch({ type: "comments/load-start" });

    try {
      const res = await services.api.request({
        //url: `/api/v1/comments?limit=*&skip=0&fields=*&search[parent]=${id}`,
        url: `/api/v1/comments?limit=*&skip=0&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&search[parent]=${id}`,
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
};

export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load,

  add: (data, id) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(data),
        });
        dispatch({
          type: "comments/add-success",
        });
        //const { id } = data.parent;
        dispatch(load(id));
      } catch (e) {
        //Ошибка
        console.error(e);
        dispatch({ type: "comments/add-error" });
      }
    };
  },
};
