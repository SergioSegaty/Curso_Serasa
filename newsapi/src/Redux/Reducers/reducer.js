export default function reducer(
  state = { items: undefined, route: {}, seach: {} },
  action
) {
  switch (action.type) {
    case "update/all":
      return {
        ...state,
        items: action.items,
        route: action.route,
        search: action.search,
      };
    case "update/single":
      let oldItems = state.items;
      let newItems = [];
      oldItems.forEach((article) => {
        if (state.route !== "#fav") {
          if (article.url === action.news.url) {
            newItems.push(action.news);
          } else {
            newItems.push(article);
          }
        } else {
          if (article.id !== action.id) {
            newItems.push(article);
          }
        }
      });
      return {
        ...state,
        items: newItems,
      };
    default:
      return state;
  }
}
