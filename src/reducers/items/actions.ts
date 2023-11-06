import { ItemType } from "./reducer"

type EditItemName = Pick<ItemType, "id" | "title">
type EditItemDescription = Pick<ItemType, "id" | "description">
type RemoveItem = ItemType["id"]

export type ItemAction =
  | { type: "ADD_ITEM", item: ItemType }
  | { type: "EDIT_ITEM_NAME", item: EditItemName }
  | { type: "EDIT_ITEM_DESCRIPTION", item: EditItemDescription }
  | { type: "REMOVE_ITEM", id: RemoveItem }

export function addItem(item: ItemType): ItemAction {
  return { type: "ADD_ITEM", item }
}

export function editItemName(item: EditItemName): ItemAction {
  return { type: "EDIT_ITEM_NAME", item }
}

export function editItemDescription(item: EditItemDescription): ItemAction {
  return { type: "EDIT_ITEM_DESCRIPTION", item }
}

export function removeItem(id: RemoveItem): ItemAction {
  return { type: "REMOVE_ITEM", id }
}
