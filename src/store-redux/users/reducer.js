export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "users/get-start":
      return { ...state, waiting: true };

    case "users/get-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "users/get-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
