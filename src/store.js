import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Получение товара по коду
   */
  getProduct(code, key) {
    const product = this.getState()[key].filter((item) => item.code === code);
    return product[0];
  }

  /**
   * Добавление товара в корзину
   */
  addProduct(code) {
    const product = this.getProduct(code, "list");
    if (
      this.getState().basket.filter((item) => item.code === code).length > 0
    ) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              sum: item.sum + item.price,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
        sum: this.state.sum + product.price,
      });
    } else {
      product.sum = product.price;
      product.quantity = 1;
      this.setState({
        ...this.state,
        basket: [...this.state.basket, product],
        sum: this.state.sum + product.price || product.price,
        quantity: this.state.quantity + 1 || 1,
      });
    }
  }

  /**
   * Удаление товара из корзины
   */
  deleteProduct(code) {
    const product = this.getProduct(code, "basket");
    this.setState({
      ...this.state,
      sum: this.state.sum - product.sum,
      quantity: this.state.quantity - 1,
      basket: this.state.basket.filter((product) => product.code !== code),
    });
  }
}

export default Store;
