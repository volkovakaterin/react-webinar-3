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
      countCatalog: 0,
    };
  }

  async load(page, perPage) {
    const numberItem = (page - 1) * 10;
    const response = await fetch(
      `/api/v1/articles?limit=${perPage}&skip=${numberItem}`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  async countCatalog() {
    const response = await fetch(
      "/api/v1/articles?fields=items(_id, title, price),count"
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      countCatalog: json.result.count,
    });
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      product: json.result,
    });
  }
}

export default Catalog;
