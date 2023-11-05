import { ItemAction } from "./actions";

export interface ItemType {
  id: string,
  title: string,
  description: string,
  tags: string[]
}

const initialState: ItemType = {
  id: "",
  title: "",
  description: "",
  tags: []
}

export const itemReducer = (state = initialState, action: ItemAction): ItemType => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, id: action.item.id, title: action.item.title }
    case "EDIT_ITEM_NAME":
      return { ...state }
    default: return state
  }
}
