import StoreModule from "../module";

class UsersState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false, // признак ожидания загрузки
    };
  }
}

export default UsersState;
