import { ColumnAction } from "./actions"
import { ItemType } from "../item/reducer"

export interface ColumnType {
  id: string,
  name: string,
  items: ItemType[]
}

interface StateType {
  columns: ColumnType[]
}

const initialState: StateType = { columns: [] }

export const columnReducer = (state = initialState, action: ColumnAction): StateType => {
  switch (action.type) {
    case "ADD_COLUMN":
      return { ...state, columns: [...state.columns, action.column] }
    case "EDIT_COLUMN_NAME":
      return {
        ...state,
        columns: state.columns.map((item) => item.id === action.column.id
          ? { ...item, name: action.column.name }
          : item
        )
      }
    case "REMOVE_COLUMN":
      return {
        ...state,
        columns: state.columns.filter(({ id }) => id !== action.id)
      }
    default: return state
  }
}
