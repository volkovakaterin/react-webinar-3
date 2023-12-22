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
      console.log(action.payload.id);
      console.log(action.payload.data.items);
      let childСomments = action.payload.data.items.filter(
        (item) => item.parent._id === action.payload.id
      );
      return { ...state, data: childСomments, waiting: false };

    case "comments/load-error":
      console.log("ошибка");
      return { ...state, data: [], waiting: false }; //@todo текст ошибки сохранять?

    case "comments/add-success":
      console.log(action.payload);
      return state;

    case "comments/add-error":
      console.log("ошибка");
      return state;

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
