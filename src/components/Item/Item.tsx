import { ChangeEvent, DragEvent, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { ColumnType } from "../../reducers/columns/reducer"
import { ItemType } from "../../reducers/items/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { AddTag, Tag } from "../Tag/Tag"
import { getEmptyImage } from "../../utils"
import "./Item.scss"

interface PropsType {
  item: ItemType,
  columnId: ColumnType["id"]
}

interface GhostItem {
  state: "none" | "appearing" | "disappearing",
  // 0 - 100 (%)
  heightRatio: number,
  // In ms
  speed: number
}

export function Item({ item, columnId }: PropsType) {
  const { dispatch: columnsDispatch, removeItem } = useColumns()
  const { dispatch, removeItems, editItemTitle, editItemDescription } = useItems()
  const itemRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(true)
  const [ghost, setGhost] = useState<GhostItem>({
    state: "none",
    heightRatio: 0,
    speed: 1
  })

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

  const dragStart = (e: DragEvent<HTMLDivElement>) => {
    setGhost({ ...ghost, state: "disappearing", heightRatio: 100 })
    let times = 0

    const interval = setInterval(() => {
      setGhost((prevState) => ({
        ...prevState,
        heightRatio: prevState.heightRatio - 2
      }))

      if (++times === 100) {
        clearInterval(interval)
        setGhost((prevState) => ({ ...prevState, state: "none" }))
      }
    }, ghost.speed)

    // - Element moves with mouse implementation

    // Set empty image for the ghost
    e.dataTransfer.setDragImage(getEmptyImage(), 0, 0)

    // Move the item

    const item = itemRef.current

    if (!item) return

    const { width, left, top } = item.getBoundingClientRect()

    const shiftX = e.clientX - left
    const shiftY = e.clientY - top

    item.style.position = "absolute"
    item.style.width = `${width}px`

    const moveAt = (pageX: number, pageY: number) => {
      item.style.left = `${pageX - shiftX}px`
      item.style.top = `${pageY - shiftY}px`
    }

    moveAt(e.pageX, e.pageY)

    const onDrag = (e: globalThis.MouseEvent) => {
      moveAt(e.pageX, e.pageY)
    }

    const onDragOver = (e: globalThis.MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener("drag", onDrag)
    document.addEventListener("dragover", onDragOver, false)

    item.ondragend = () => {
      document.removeEventListener("drag", onDrag)
      document.removeEventListener("dragover", onDragOver)

      item.style.position = "static"
      item.style.width = "100%"
      item.ondragend = null

      setIsDragging(false)
    }
  }

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    console.log(e)
    e.stopPropagation()
  }

  return (
    <>
      {ghost.state !== "none" && itemRef.current && (
        <span
          className="ghost-item"
          aria-hidden={true}
          style={{ height: `${itemRef.current.getBoundingClientRect().height * ghost.heightRatio / 100}px` }}>
        </span>
      )}
      <div
        className="item"
        ref={itemRef}
        draggable={isDragging}
        onDragStart={dragStart}
        onDragEnter={onDragEnter}
      >
        <div className="item__header">
          <h4
            className="item__title"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={changeTitle}
          >{item.title}</h4>
          <div className="item__actions">
            <span className="material-symbols-outlined" onClick={deleteItem}>delete</span>
            <span
              className="material-symbols-outlined"
              onMouseDown={() => setIsDragging(true)}
            >drag_handle</span>
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
            <Tag key={index} itemId={item.id} tag={tag} index={index} />
          ))}
          <AddTag itemId={item.id} />
        </div>
      </div>
    </>
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
