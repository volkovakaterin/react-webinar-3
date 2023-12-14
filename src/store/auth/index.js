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
    this.setState(
      {
        ...this.getState(),
        error: null,
        waiting: true,
      },
      "Авторизация, сброс состояния"
    );

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
      //Ошибка
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        console.log(errorData.error.message);
        this.setState(
          {
            ...this.getState(),
            error: errorData.error.message,
            waiting: false,
          },
          "Ошибка авторизации"
        );
        throw new Error("Server Error");
      }
      //Успешная авторизация
      const data = await response.json();
      console.log(data);
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
      this.setState(
        {
          ...this.getState(),
          waiting: false,
        },
        "Плохая авторизацтя"
      );
      if (!(error instanceof Error)) {
        throw new Error("Server Error");
      }
    }
  }

  // autoAuth() {
  //   this.setState(
  //     {
  //       ...this.getState(),
  //       auth: true,
  //     },
  //     "автоАвторизицая"
  //   );
  // }

  //Выход
  async logout() {
    this.setState(
      {
        ...this.getState(),
        error: null,
        waiting: true,
      },
      "Выход, начало загрузки"
    );
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });
      //Ошибка
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        console.log(errorData.error.message);
        this.setState(
          {
            ...this.getState(),
            error: errorData.error.message,
            waiting: false,
          },
          "Ошибка выхода"
        );
        throw new Error("Server Error");
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
      this.setState(
        {
          ...this.getState(),
          waiting: false,
        },
        "Ошибка выхода "
      );
      if (!(error instanceof Error)) {
        throw new Error("Server Error");
      }
    }
  }

  //Загрузить профиль пользователя
  async getUser() {
    this.setState(
      {
        ...this.getState(),
        error: null,
        waiting: true,
      },
      "Загрузить профиль пользователя начало загрузки"
    );
    const id = localStorage.getItem("idUser");
    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });

      //Ошибка
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.log(errorData);
      //   console.log(errorData.error.message);
      //   this.setState(
      //     {
      //       ...this.getState(),
      //       error: errorData.error.message,
      //       waiting: false,
      //     },
      //     "Ошибка загрузки юзера"
      //   );
      //   throw new Error("Server Error");
      // }

      //Данные получены
      const data = await response.json();
      console.log(data);
      console.log(
        data.result.user.profile.name,
        data.result.user.profile.phone,
        data.result.user.email
      );
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
        "Загружен пользователь"
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
        },
        "Ошибка 2 загрузки пользователя"
      );
      if (!(error instanceof Error)) {
        throw new Error("Server Error");
      }
    }
  }
}

export default AuthState;
