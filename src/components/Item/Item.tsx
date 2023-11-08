import { ChangeEvent } from "react"
import { v4 as uuidv4 } from "uuid"
import { ColumnType } from "../../reducers/columns/reducer"
import { ItemType } from "../../reducers/items/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import "./Item.scss"

interface PropsType {
  item: ItemType,
  columnId: ColumnType["id"]
}

export function Item({ item, columnId }: PropsType) {
  const { dispatch: columnsDispatch, removeItem } = useColumns()
  const {
    dispatch,
    removeItems,
    editItemTitle,
    editItemDescription,
    addTag,
    editTag,
    removeTag
  } = useItems()

  const deleteItem = () => {
    dispatch(removeItems([item.id]))
    columnsDispatch(removeItem({
      column: columnId,
      item: item.id
    }))
  }

  const changeTitle = (e: ChangeEvent<HTMLHeadingElement>) => {
    const value = e.target.textContent || ""

    dispatch(editItemTitle({
      id: item.id,
      title: value
    }))
  }

  const changeDescription = (e: ChangeEvent<HTMLParagraphElement>) => {
    const value = e.target.textContent || ""

    dispatch(editItemDescription({
      id: item.id,
      description: value
    }))
  }

  const addNewTag = () => {
    dispatch(addTag({
      itemId: item.id,
      name: "New tag"
    }))
  }

  const changeTag = (e: ChangeEvent<HTMLSpanElement>, index: number) => {
    const value = e.target.textContent || ""

    dispatch(editTag({
      itemId: item.id,
      index,
      name: value
    }))
  }

  const deleteTag = (index: number) => {
    dispatch(removeTag({
      itemId: item.id,
      index
    }))
  }

  return (
    <div className="item">
      <div className="item__header">
        <h4
          className="item__title"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={changeTitle}
        >{item.title}</h4>
        <div className="item__actions">
          <span className="material-symbols-outlined" onClick={deleteItem}>delete</span>
          <span className="material-symbols-outlined">drag_handle</span>
        </div>
      </div>
      <p
        className="item__description"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={changeDescription}
      >{item.description}</p>
      <div className="item__tags">
        {item.tags.map((tag, index) => (
          <div key={index} className="item__tag">
            <span
              className="item__tag-remove"
              aria-label="Remove tag"
              onClick={() => deleteTag(index)}
            >+</span>
            <span
              className="item__tag-name"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e: ChangeEvent<HTMLSpanElement>) => changeTag(e, index)}
            >{tag}</span>
          </div>
        ))}
        <span className="item__tag add-tag" aria-label="Add new tag" onClick={addNewTag}>+</span>
      </div>
    </div>
  )
}

interface AddItemProps {
  columnId: ColumnType["id"]
}

export function AddItem({ columnId }: AddItemProps) {
  const { dispatch: columnsDispatch, addItem: addItemToColumn } = useColumns()
  const { dispatch: itemsDispatch, addItem } = useItems()

  const clickHandler = () => {
    const itemId = uuidv4()

    itemsDispatch(addItem({
      id: itemId,
      title: "New task",
      description: "Task description"
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
