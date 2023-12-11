import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      listPag: [],
      count: null,
      currentPage: 1,
    };
  }

  setCurrentPage(number) {
    this.setState({
      ...this.getState(),
      currentPage: number,
    });
  }

  async load() {
    const response = await fetch("/api/v1/articles?limit=*");
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены ВСЕ товары из АПИ"
    );
  }

  async loadPag(perPage) {
    const currentPage = this.getState().currentPage;
    const numberItem = (currentPage - 1) * 10;
    const response = await fetch(
      `/api/v1/articles?limit=${perPage}&skip=${numberItem}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        listPag: json.result.items,
        count: json.result.count,
      },
      "Пагинация"
    );
  }
}

export default Catalog;
