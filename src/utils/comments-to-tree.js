/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function commentsToTree(list, idArticle, users, key = "_id") {
  let trees = {};
  let roots = {};
  for (const item of list) {
    console.log(item.parent._tree.length);

    const username = users.find((user) => {
      if (user._id === item.author._id) return user;
    });
    item.author.name = username ? username.profile.name : "user";

    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent._id !== idArticle) {
      console.log("Если элемент имеет родителя");
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent._id]) {
        console.log("Если родителя ещё нет в индексе");
        trees[item.parent[key]] = { children: [] };
      }
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      console.log(trees[item.parent[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
}