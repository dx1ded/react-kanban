import { ItemAction } from "./actions"

export interface ItemType {
  id: string,
  title: string,
  description: string,
  color: string,
  tags: string[]
}

export type StateType = ItemType[]

const initialState: StateType = []

export const itemsReducer = (state = initialState, action: ItemAction): StateType => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { ...action.item, tags: [] }]
    case "EDIT_ITEM_TITLE":
      return state.map((item) => item.id === action.item.id
        ? { ...item, title: action.item.title }
        : item
      )
    case "EDIT_ITEM_DESCRIPTION":
      return state.map((item) => item.id === action.item.id
        ? { ...item, description: action.item.description }
        : item
      )
    case "REMOVE_ITEMS":
      return state.filter(({ id }) => !action.ids.includes(id))
    case "ADD_TAG":
      return state.map((item) => item.id === action.tag.itemId
        ? { ...item, tags: [...item.tags, action.tag.name] }
        : item
      )
    case "EDIT_TAG":
      return state.map((item) => item.id === action.tag.itemId
        ? {
          ...item,
          tags: item.tags.map((tag, index) => index === action.tag.index
            ? action.tag.name
            : tag
          )
        }
        : item
      )
    case "REMOVE_TAG":
      return state.map((item) => item.id === action.tag.itemId
        ? { ...item, tags: item.tags.filter((_, index) => index !== action.tag.index) }
        : item
      )
    default: return state
  }
}
