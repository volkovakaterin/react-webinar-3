import StoreModule from "../module";

class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      listCategory: [],
    };
  }

  //Запрос категорий из апи

  async getCategories() {
    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();

    function buildCategoryList(categories, parentId = null, level = 0) {
      const categoryList = [];

      categories.forEach((category) => {
        if (
          (category.parent && category.parent._id === parentId) ||
          (!category.parent && parentId === null)
        ) {
          const modifiedCategory = {
            _id: category._id,
            title: "- ".repeat(level) + category.title,
          };

          categoryList.push(modifiedCategory);

          const children = buildCategoryList(
            categories,
            category._id,
            level + 1
          );
          categoryList.push(...children);
        }
      });

      return categoryList;
    }

    const list = buildCategoryList(json.result.items);

    this.setState(
      {
        ...this.getState(),
        listCategory: list,
      },
      "Загружены возможные категории из АПИ"
    );
  }
}

export default CategoryState;
