import { ColumnType } from "./reducer"
import { ItemType } from "../items/reducer"

type IdAndName = Pick<ColumnType, "id" | "name">
type RemoveColumn = ColumnType["id"]
type ColumnAndItemIds = {
  column: ColumnType["id"],
  item: ItemType["id"]
}

type AddItemAt = ColumnAndItemIds & {
  refItem: ItemType["id"],
  isBefore: boolean
}

export type ColumnAction =
  | { type: "ADD_COLUMN", column: IdAndName }
  | { type: "EDIT_COLUMN_NAME", column: IdAndName }
  | { type: "REMOVE_COLUMN", id: RemoveColumn }
  | { type: "ADD_ITEM", ids: ColumnAndItemIds }
  | { type: "ADD_ITEM_AT", ids: AddItemAt }
  | { type: "REMOVE_ITEM", ids: ColumnAndItemIds }
  | { type: "CLEAR_COLUMNS" }

export function addColumn(column: IdAndName): ColumnAction {
  return { type: "ADD_COLUMN", column }
}

export function editColumnName(column: IdAndName): ColumnAction {
  return { type: "EDIT_COLUMN_NAME", column }
}

export function removeColumn(id: RemoveColumn): ColumnAction {
  return { type: "REMOVE_COLUMN", id }
}

export function addItem(ids: ColumnAndItemIds): ColumnAction {
  return { type: "ADD_ITEM", ids }
}

export function addItemAt(ids: AddItemAt): ColumnAction {
  return { type: "ADD_ITEM_AT", ids }
}

export function removeItem(ids: ColumnAndItemIds): ColumnAction {
  return { type: "REMOVE_ITEM", ids }
}

export function clearColumns(): ColumnAction {
  return { type: "CLEAR_COLUMNS" }
}
