import { ColumnType } from "./reducer"

type EditColumnName = Pick<ColumnType, "id" | "name">
type RemoveColumn = ColumnType["id"]

export type ColumnAction =
  | { type: "ADD_COLUMN", column: ColumnType }
  | { type: "EDIT_COLUMN_NAME", column: EditColumnName }
  | { type: "REMOVE_COLUMN", id: RemoveColumn }

export function addColumn(column: ColumnType): ColumnAction {
  return { type: "ADD_COLUMN", column }
}

export function editColumnName(column: EditColumnName): ColumnAction {
  return { type: "EDIT_COLUMN_NAME", column }
}

export function removeColumn(id: RemoveColumn): ColumnAction {
  return { type: "REMOVE_COLUMN", id }
}
