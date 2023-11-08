import { useContext, useReducer } from "react"
import { itemsReducer, StateType } from "../reducers/items/reducer"
import { KanbanContext } from "../context/kanbanContext"
import {
  addItem,
  editItemTitle,
  editItemDescription,
  removeItems,
  addTag,
  editTag,
  removeTag
} from "../reducers/items/actions"

export function useItemsContext(initialState: StateType) {
  const [state, dispatch] = useReducer(itemsReducer, initialState)

  return { state, dispatch }
}

export function useItems() {
  const { items: { state, dispatch } } = useContext(KanbanContext)

  return {
    state,
    dispatch,
    addItem,
    editItemTitle,
    editItemDescription,
    removeItems,
    addTag,
    editTag,
    removeTag
  }
}
