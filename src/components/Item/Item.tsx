import { ChangeEvent, MouseEvent, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { ColumnType } from "../../reducers/columns/reducer"
import { ItemType } from "../../reducers/items/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { useDrag } from "../../hooks/useDrag"
import { AddTag, Tag } from "../Tag/Tag"
import "./Item.scss"

interface PropsType {
  item: ItemType,
  columnId: ColumnType["id"],
  index: number
}

interface GhostItem {
  state: "none" | "appearing" | "disappearing",
  height: number,
  // 0 - 100 (%)
  heightRatio: number,
  // In ms
  speed: number
}

export function Item({ item, columnId, index }: PropsType) {
  const { dispatch: columnsDispatch, addItemAt, removeItem } = useColumns()
  const { dispatch, removeItems, editItemTitle, editItemDescription } = useItems()
  const { drag, setDrag } = useDrag()
  const itemRef = useRef<HTMLDivElement>(null)
  const [ghost, setGhost] = useState<GhostItem>({
    state: "none",
    height: 0,
    heightRatio: 0,
    speed: 4
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

  const toggleGhost = (params: Pick<GhostItem, "state" | "height">) => {
    const { state, height } = params
    const ADD_BY: number = 2
    const defaultHeightRatio: number = state === "appearing" ? 0 : 100

    let times = 0

    setGhost((prevState) => ({
      ...prevState,
      state,
      height,
      heightRatio: defaultHeightRatio
    }))

    const interval = setInterval(() => {
      setGhost((prevState) => ({
        ...prevState,
        heightRatio: prevState.heightRatio + (state === "appearing" ? ADD_BY : -ADD_BY)
      }))

      times += ADD_BY

      if (times === 100) {
        if (state === "disappearing") {
          setGhost((prevState) => ({ ...prevState, state: "none" }))
        }

        clearInterval(interval)
      }
    }, ghost.speed)
  }

  const mouseDown = (e: MouseEvent<HTMLSpanElement>) => {
    const itemEl = itemRef.current

    if (!itemEl) return

    const { width, height, left, top } = itemEl.getBoundingClientRect()

    toggleGhost({ state: "disappearing", height })

    setDrag({
      columnId,
      itemId: item.id,
      isDragging: true
    })

    // - Element moves with mouse implementation

    // Move the item

    const itemClone = itemEl.cloneNode(true) as HTMLDivElement

    const shiftX = e.clientX - left
    const shiftY = e.clientY - top

    itemEl.classList.add("visually-hidden")
    itemEl.setAttribute("data-draggable", "true")

    itemClone.style.position = "absolute"
    itemClone.style.width = `${width}px`
    itemClone.style.pointerEvents = "none"

    const moveAt = (pageX: number, pageY: number) => {
      itemClone.style.left = `${pageX - shiftX}px`
      itemClone.style.top = `${pageY - shiftY}px`
    }

    moveAt(e.pageX, e.pageY)
    document.body.appendChild(itemClone)

    const onMouseMove = (e: globalThis.MouseEvent) => {
      moveAt(e.pageX, e.pageY)
    }

    document.addEventListener("mousemove", onMouseMove)

    document.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove)

      itemClone.remove()
      itemEl.classList.remove("visually-hidden")
      itemEl.removeAttribute("data-draggable")
      document.onmouseup = null

      setDrag({
        columnId: "",
        itemId: "",
        isDragging: false
      })
    }
  }

  const mouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (!drag.isDragging) return

    const item = e.target as HTMLDivElement

    const height = item.getBoundingClientRect().height

    toggleGhost({ state: "appearing", height })
  }

  const mouseLeave = () => {
    if (!drag.isDragging || itemRef.current!.dataset.draggable === "true") return

    console.log("leave")

    toggleGhost({ state: "disappearing", height: ghost.height })
  }

  const drop = () => {
    toggleGhost({ state: "disappearing", height: ghost.height })

    columnsDispatch(removeItem({
      column: drag.columnId,
      item: drag.itemId
    }))

    columnsDispatch(addItemAt({
      index,
      ids: {
        column: columnId,
        item: drag.itemId
      }
    }))
  }

  return (
    <>
      {ghost.state !== "none" && (
        <span
          className="ghost-item"
          aria-hidden={true}
          onMouseLeave={mouseLeave}
          onMouseUp={drop}
          style={{ height: `${ghost.height * ghost.heightRatio / 100}px` }}>
        </span>
      )}
      <div
        className="item"
        ref={itemRef}
        onMouseEnter={mouseEnter}
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
              onMouseDown={mouseDown}
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
