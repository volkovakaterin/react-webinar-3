import StoreModule from "../module";

class CommentsState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false, // признак ожидания загрузки
    };
  }
}

export default CommentsState;
