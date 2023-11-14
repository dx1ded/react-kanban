import { useContext } from "react"
import { useReducerWithAfterware } from "./useReducerWithAfterware"
import { itemsReducer, StateType } from "../reducers/items/reducer"
import { LocalStorageAfterware } from "../reducers/localStorage.afterware"
import { KanbanContext } from "../context/kanbanContext"
import {
  addItem,
  editItemTitle,
  editItemDescription,
  removeItems,
  addTag,
  editTag,
  removeTag,
  clearItems
} from "../reducers/items/actions"
import { LOCALSTORAGE_ITEMS } from "../utils"

export function useItemsContext(initialState: StateType = []) {
  const [state, dispatch] = useReducerWithAfterware(
    itemsReducer,
    initialState,
    LocalStorageAfterware(LOCALSTORAGE_ITEMS)
  )

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
    removeTag,
    clearItems
  }
}
