import { useContext, useReducer } from "react"
import { columnsReducer, StateType } from "../reducers/columns/reducer"
import { KanbanContext } from "../context/kanbanContext"
import { addColumn, editColumnName, removeColumn, addItem, addItemAt, removeItem } from "../reducers/columns/actions"

export function useColumnsContext(initialState: StateType = []) {
  const [state, dispatch] = useReducer(columnsReducer, initialState)

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
    removeItem
  }
}
