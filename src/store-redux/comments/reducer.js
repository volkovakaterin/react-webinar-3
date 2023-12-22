// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data.items, waiting: false };

    case "comments/load-error":
      return { ...state, data: [], waiting: false }; //@todo текст ошибки сохранять?

    case "comments/add-success":
      return state;

    case "comments/add-error":
      return state;

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
