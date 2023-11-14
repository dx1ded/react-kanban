import { useContext } from "react"
import { useReducerWithAfterware } from "./useReducerWithAfterware"
import { columnsReducer, StateType } from "../reducers/columns/reducer"
import { LocalStorageAfterware } from "../reducers/localStorage.afterware"
import { KanbanContext } from "../context/kanbanContext"
import {
  addColumn,
  editColumnName,
  removeColumn,
  addItem,
  addItemAt,
  removeItem,
  clearColumns
} from "../reducers/columns/actions"
import { LOCALSTORAGE_COLUMNS } from "../utils"

export function useColumnsContext(initialState: StateType = []) {
  const [state, dispatch] = useReducerWithAfterware(
    columnsReducer,
    initialState,
    LocalStorageAfterware(LOCALSTORAGE_COLUMNS)
  )

  return { state, dispatch }
}

export function useColumns() {
  const { columns: { state, dispatch } } = useContext(KanbanContext)

  return {
    state,
    dispatch,
    addColumn,
    editColumnName,
    removeColumn,
    addItem,
    addItemAt,
    removeItem,
    clearColumns
  }
}
