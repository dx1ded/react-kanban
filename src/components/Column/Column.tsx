import { ChangeEvent } from "react"
import { ColumnType } from "../../reducers/columns/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { Item } from "../Item/Item"
import { AddItem } from "../Item/AddItem"
import "./Column.scss"

interface PropsType {
  column: ColumnType
}

export function Column({ column }: PropsType) {
  const { dispatch, editColumnName, removeColumn } = useColumns()
  const { state, dispatch: itemsDispatch, removeItems } = useItems()

  const deleteColumn = () => {
    dispatch(removeColumn(column.id))
    itemsDispatch(removeItems(
      column.items.map((id) => id)
    ))
  }

  const changeHandler = (e: ChangeEvent<HTMLDivElement>) => {
    const value = e.target.textContent || ""

    dispatch(editColumnName({
      id: column.id,
      name: value
    }))
  }

  return (
    <div className="column">
      <div className="column__header">
        <span
          className="material-symbols-outlined column__delete"
          onClick={deleteColumn}
        >delete</span>
        <h2
          className="column__name"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={changeHandler}>
          {column.name}</h2>
      </div>
      <div className="column__items">
        {column.items.map((id) => (
          <Item
            key={id}
            item={state.find((item) => item.id === id)!}
            columnId={column.id}
          />
        ))}
        <AddItem columnId={column.id} />
      </div>
    </div>
  )
}
