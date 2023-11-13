import { useState, useRef, ChangeEvent, MouseEvent } from "react"
import { ColumnType } from "../../reducers/columns/reducer"
import { ItemType } from "../../reducers/items/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { useDrag } from "../../hooks/useDrag"
import { AddTag, Tag } from "../Tag/Tag"
import { HIDDEN_CLASSNAME } from "../../utils"
import "./Item.scss"

interface PropsType {
  item: ItemType,
  columnId: ColumnType["id"]
}

interface GhostItem {
  state: "none" | "appearing" | "disappearing",
  height: number,
  // 0 - 100 (%)
  heightRatio: number,
  // In ms
  delay: number
}

export function Item({ item, columnId }: PropsType) {
  const { dispatch: columnsDispatch, addItemBefore, removeItem } = useColumns()
  const { dispatch, removeItems, editItemTitle, editItemDescription } = useItems()
  const { drag, setDrag } = useDrag()
  const itemRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<number | null>(null)
  const [ghost, setGhost] = useState<GhostItem>({
    state: "none",
    height: 0,
    heightRatio: 0,
    delay: 8
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

  const forceGhostRemoval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setGhost((prevState) => ({ ...prevState, state: "none" }))
  }

  const toggleGhost = ({ state, height }: Pick<GhostItem, "state" | "height">) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const ADD_BY: number = 4
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

      if (times >= 100) {
        if (state === "disappearing") {
          return forceGhostRemoval()
        }

        clearInterval(interval)
        intervalRef.current = null
      }
    }, ghost.delay)

    intervalRef.current = interval
  }

  const mouseDownHandler = (e: MouseEvent<HTMLSpanElement>) => {
    const itemEl = itemRef.current

    if (!itemEl) return

    const { width, height, left, top } = itemEl.getBoundingClientRect()

    toggleGhost({ state: "disappearing", height })

    setDrag({
      columnId,
      itemId: item.id,
      isDragging: true
    })

    const itemClone = itemEl.cloneNode(true) as HTMLDivElement

    const shiftX = e.clientX - left
    const shiftY = e.clientY - top

    itemEl.classList.add(HIDDEN_CLASSNAME)
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

    const mouseMoveHandler = (e: globalThis.MouseEvent) => {
      moveAt(e.pageX, e.pageY)
    }

    document.addEventListener("mousemove", mouseMoveHandler)

    document.onmouseup = () => {
      document.removeEventListener("mousemove", mouseMoveHandler)

      itemClone.remove()
      itemEl.classList.remove(HIDDEN_CLASSNAME)
      itemEl.removeAttribute("data-draggable")
      document.onmouseup = null

      setDrag({ columnId: "", itemId: "", isDragging: false })
      forceGhostRemoval()
    }
  }

  const mouseEnterHandler = () => {
    if (!drag.isDragging || !itemRef.current || intervalRef.current) return

    const { height } = itemRef.current.getBoundingClientRect()

    toggleGhost({ state: "appearing", height })
  }

  const mouseLeaveHandler = () => {
    if (!itemRef.current) return

    const draggable = !!itemRef.current.dataset.draggable

    if (!drag.isDragging || draggable) return

    toggleGhost({ state: "disappearing", height: ghost.height })
  }

  const dropHandler = () => {
    if (!itemRef.current) return

    const draggable = !!itemRef.current.dataset.draggable

    if (!drag.isDragging || draggable) return

    columnsDispatch(removeItem({
      column: drag.columnId,
      item: drag.itemId
    }))

    columnsDispatch(addItemBefore({
      column: columnId,
      beforeItem: item.id,
      item: drag.itemId
    }))

    forceGhostRemoval()
  }

  return (
    <div
      className="item-wrapper"
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseUp={dropHandler}
    >
      {ghost.state !== "none" && (
        <span
          className="ghost-item"
          aria-hidden={true}
          style={{ height: `${ghost.height * ghost.heightRatio / 100}px` }}>
        </span>
      )}
      <div
        className="item"
        ref={itemRef}
        style={{ backgroundColor: item.color }}
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
              onMouseDown={mouseDownHandler}
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
    </div>
  )
}
