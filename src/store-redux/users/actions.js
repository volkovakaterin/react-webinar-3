export default {
  getUsers: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "users/get-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/users?limit=*`,
        });
        dispatch({
          type: "users/get-success",
          payload: { data: res.data.result.items },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "users/get-error" });
      }
    };
  },
};
