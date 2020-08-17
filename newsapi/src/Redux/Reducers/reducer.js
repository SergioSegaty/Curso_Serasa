export default function reducer(
  state = { items: undefined, route: {}, seach: {} }, action
) {
  switch (action.type) {
    case "DELETE":
      state.items.splice(action.id, 1);
      return state;
    case "UPDATE":
      return {
        ...state,
        items: action.items,
        route: action.route,
        search: action.search,
      };
    case "SAVE_FAVORITE":
        return action.item            
    default:
      return state;
  }
}
