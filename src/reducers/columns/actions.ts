import { ColumnType } from "./reducer"
import { ItemType } from "../items/reducer"

type IdAndName = Pick<ColumnType, "id" | "name">
type RemoveColumn = ColumnType["id"]
type ColumnAndItemIds = {
  column: ColumnType["id"],
  item: ItemType["id"]
}

type AddItemBefore = ColumnAndItemIds & {
  beforeItem: ItemType["id"]
}

export type ColumnAction =
  | { type: "ADD_COLUMN", column: IdAndName }
  | { type: "EDIT_COLUMN_NAME", column: IdAndName }
  | { type: "REMOVE_COLUMN", id: RemoveColumn }
  | { type: "ADD_ITEM", ids: ColumnAndItemIds }
  | { type: "ADD_ITEM_BEFORE", ids: AddItemBefore }
  | { type: "REMOVE_ITEM", ids: ColumnAndItemIds }

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

export function addItemBefore(ids: AddItemBefore): ColumnAction {
  return { type: "ADD_ITEM_BEFORE", ids }
}

export function removeItem(ids: ColumnAndItemIds): ColumnAction {
  return { type: "REMOVE_ITEM", ids }
}
