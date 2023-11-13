import { v4 as uuidv4 } from "uuid"
import { useColumns } from "../../hooks/useColumns"
import "./AddColumn.scss"

export function AddColumn() {
  const { dispatch, addColumn } = useColumns()

  const clickHandler = () => {
    dispatch(addColumn({
      id: uuidv4(),
      name: "New column"
    }))
  }

  return (
    <button
      type="button"
      className="add-column"
      aria-label="Add new column"
      onClick={clickHandler}
    >+</button>
  )
}
