import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthState extends StoreModule {
  initState() {
    return {
      auth: false,
      error: null,
      waiting: false,
      profile: {},
    };
  }

  //Авторизация
  async auth(login, password) {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
      });
      //Ошибка запроса
      if (!response.ok) {
        const errorData = await response.json();
        this.setState({
          ...this.getState(),
          error: errorData.error.message,
          waiting: false,
        });
      }
      //Успешная авторизация
      const data = await response.json();
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("idUser", data.result.user._id);
      this.setState(
        {
          ...this.getState(),
          auth: true,
          waiting: false,
          profile: {
            username: data.result.user.profile.name,
            phone: data.result.user.profile.phone,
            email: data.result.user.email,
          },
        },
        "Успешная авторизация"
      );
    } catch (error) {
      if (!(error instanceof Error)) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
        throw new Error("Server Error");
      }
    }
  }

  // Выход из аккаунта
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });
      //Ошибка запроса
      if (!response.ok) {
        const errorData = await response.json();
        this.setState({
          ...this.getState(),
          error: errorData.error.message,
          waiting: false,
        });
      }
      //Токен удален
      localStorage.clear();
      this.setState(
        {
          ...this.initState(),
        },
        "Токен удален"
      );
    } catch (error) {
      if (!(error instanceof Error)) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });

        throw new Error("Server Error");
      }
    }
  }

  //Загрузить данные пользователя
  async getUser() {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    });
    const id = localStorage.getItem("idUser");
    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      //Ошибка запроса
      if (!response.ok) {
        this.setState(
          {
            ...this.getState(),
            error: data.error.message,
            waiting: false,
          },
          "Ошибка получения пользователя"
        );
      } else {
        //Данные получены
        this.setState(
          {
            ...this.getState(),
            auth: true,
            waiting: false,
            profile: {
              username: data.result.profile.name,
              phone: data.result.profile.phone,
              email: data.result.email,
            },
          },
          "Загружен пользователь"
        );
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
        throw new Error("Server Error");
      }
    }
  }
}

export default AuthState;
