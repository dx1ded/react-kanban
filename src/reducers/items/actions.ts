import { ItemType } from "./reducer"

type IdAndTitleAndDescription = Omit<ItemType, "tags">
type EditItemTitle = Pick<ItemType, "id" | "title">
type EditItemDescription = Pick<ItemType, "id" | "description">
type RemoveItems = ItemType["id"][]

type AddTag = { itemId: ItemType["id"], name: string }
type EditTag = { itemId: ItemType["id"], index: number, name: string }
type RemoveTag = { itemId: ItemType["id"], index: number }

export type ItemAction =
  | { type: "ADD_ITEM", item: IdAndTitleAndDescription }
  | { type: "EDIT_ITEM_TITLE", item: EditItemTitle }
  | { type: "EDIT_ITEM_DESCRIPTION", item: EditItemDescription }
  | { type: "REMOVE_ITEMS", ids: RemoveItems }
  | { type: "ADD_TAG", tag: AddTag }
  | { type: "EDIT_TAG", tag: EditTag }
  | { type: "REMOVE_TAG", tag: RemoveTag }

export function addItem(item: IdAndTitleAndDescription): ItemAction {
  return { type: "ADD_ITEM", item }
}

export function editItemTitle(item: EditItemTitle): ItemAction {
  return { type: "EDIT_ITEM_TITLE", item }
}

export function editItemDescription(item: EditItemDescription): ItemAction {
  return { type: "EDIT_ITEM_DESCRIPTION", item }
}

export function removeItems(ids: RemoveItems): ItemAction {
  return { type: "REMOVE_ITEMS", ids }
}

export function addTag(tag: AddTag): ItemAction {
  return { type: "ADD_TAG", tag }
}

export function editTag(tag: EditTag): ItemAction {
  return { type: "EDIT_TAG", tag }
}

export function removeTag(tag: RemoveTag): ItemAction {
  return { type: "REMOVE_TAG", tag }
}
