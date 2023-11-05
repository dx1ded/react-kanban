import "./Column.scss"
import { AddItem, Item } from "../Item/Item"

export function Column() {
  return (
    <div className="column">
      <h2 className="column__name">To-Do</h2>
      <div className="column__items">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <AddItem />
      </div>
    </div>
  )
}

export function AddColumn() {
  return (
    <button type="button" className="add-column" aria-label="Add new column">+</button>
  )
}
