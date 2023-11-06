import { ColumnAction } from "./actions"
import { ItemType } from "../items/reducer"

export interface ColumnType {
  id: string,
  name: string,
  items: Pick<ItemType, "id">[]
}

type StateType = ColumnType[]

const initialState: StateType = []

export const columnsReducer = (state = initialState, action: ColumnAction): StateType => {
  switch (action.type) {
    case "ADD_COLUMN":
      return [...state, action.column]
    case "EDIT_COLUMN_NAME":
      return state.map((column) => column.id === action.column.id
        ? { ...column, name: action.column.name }
        : column
      )
    case "REMOVE_COLUMN":
      return state.filter(({ id }) => id !== action.id)
    default: return state
  }
}
