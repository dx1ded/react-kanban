import { v4 as uuidv4 } from "uuid"
import { ColumnType } from "../../reducers/columns/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { generateColors } from "../../utils"
import "./AddItem.scss"

interface AddItemProps {
  columnId: ColumnType["id"]
}

const colors = generateColors()

export function AddItem({ columnId }: AddItemProps) {
  const { dispatch: columnsDispatch, addItem: addItemToColumn } = useColumns()
  const { dispatch, addItem } = useItems()

  const clickHandler = () => {
    const itemId = uuidv4()

    dispatch(addItem({
      id: itemId,
      title: "New task",
      description: "Task description",
      color: colors.next().value
    }))

    columnsDispatch(addItemToColumn({
      column: columnId,
      item: itemId
    }))
  }

  return (
    <button
      type="button"
      className="add-item"
      aria-label="Add new item"
      onClick={clickHandler}
    >+</button>
  )
}
