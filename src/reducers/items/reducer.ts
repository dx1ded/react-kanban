import { ItemAction } from "./actions"

export interface ItemType {
  id: string,
  title: string,
  description: string,
  tags: string[]
}

type StateType = ItemType[]

const initialState: StateType = []

export const itemsReducer = (state = initialState, action: ItemAction): StateType => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item]
    case "EDIT_ITEM_NAME":
      return state.map((item) => item.id === action.item.id
        ? { ...item, title: item.title }
        : item
      )
    case "EDIT_ITEM_DESCRIPTION":
      return state.map((item) => item.id === action.item.id
        ? { ...item, description: item.description }
        : item
      )
    case "REMOVE_ITEM":
      return state.filter(({ id }) => id !== action.id)
    default: return state
  }
}
