import { ColumnAction } from "./actions"
import { ItemType } from "../items/reducer"

export interface ColumnType {
  id: string,
  name: string,
  items: ItemType["id"][]
}

export type StateType = ColumnType[]

const initialState: StateType = []

export const columnsReducer = (state = initialState, action: ColumnAction): StateType => {
  switch (action.type) {
    case "ADD_COLUMN":
      return [...state, { ...action.column, items: [] }]
    case "EDIT_COLUMN_NAME":
      return state.map((column) => column.id === action.column.id
        ? { ...column, name: action.column.name }
        : column
      )
    case "REMOVE_COLUMN":
      return state.filter(({ id }) => id !== action.id)
    case "ADD_ITEM":
      return state.map((column) => column.id === action.ids.column
        ? { ...column, items: [...column.items, action.ids.item] }
        : column
      )
    case "ADD_ITEM_AT":
      return state.map((column) => column.id === action.ids.column
        ? {
            ...column,
            items: column.items.map((id) => id === action.ids.refItem
              ? [action.ids.isBefore ? action.ids.item : id, action.ids.isBefore ? id : action.ids.item]
              : id
            ).flat()
          }
        : column
      )
    case "REMOVE_ITEM":
      return state.map((column) => column.id === action.ids.column
        ? { ...column, items: column.items.filter((id) => id !== action.ids.item) }
        : column
      )
    case "CLEAR_COLUMNS":
      return []
    default: return state
  }
}
