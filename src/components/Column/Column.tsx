import "./Column.scss"
import { Item } from "../Item/Item"

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
      </div>
    </div>
  )
}
