import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      title: "",
      product: null,
    };
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
        title: json.result.title,
      },
      "Загрузка продукта"
    );
  }
}

export default Product;
