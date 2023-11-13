import { useRef, ChangeEvent, MouseEvent } from "react"
import { ColumnType } from "../../reducers/columns/reducer"
import { ItemType } from "../../reducers/items/reducer"
import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { useGhost } from "../../hooks/useGhost"
import { useDrag } from "../../hooks/useDrag"
import { AddTag, Tag } from "../Tag/Tag"
import { HIDDEN_CLASSNAME } from "../../utils"
import "./Item.scss"

interface PropsType {
  item: ItemType,
  columnId: ColumnType["id"]
}

export function Item({ item, columnId }: PropsType) {
  const { dispatch: columnsDispatch, addItemAt, removeItem } = useColumns()
  const { dispatch, removeItems, editItemTitle, editItemDescription } = useItems()
  const { drag, setDrag } = useDrag()
  const prev = useGhost("ghost-item ghost-item--prev")
  const next = useGhost("ghost-item ghost-item--next")
  const itemRef = useRef<HTMLDivElement | null>(null)
  // Top | bottom of the element
  const dragPosition = useRef<string | null>(null)

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

  const mouseDownHandler = (e: MouseEvent<HTMLSpanElement>) => {
    const itemEl = itemRef.current

    if (!itemEl) return

    const { width, height, left, top } = itemEl.getBoundingClientRect()

    prev.toggle({ state: "disappearing", height })

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
    }
  }

  const mouseOverHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!drag.isDragging || !itemRef.current) return

    const { height, top } = itemRef.current.getBoundingClientRect()
    const position = height / 2 >= e.clientY - top ? "top" : "bottom"

    if (dragPosition.current === position) return

    dragPosition.current = position

    if (position === "top") {
      prev.toggle({ state: "appearing", height }, true, true)
      next.toggle({ state: "disappearing", height: next.ghost.height }, false, true)
    } else {
      prev.toggle({ state: "disappearing", height: prev.ghost.height }, false, true)
      next.toggle({ state: "appearing", height }, true, true)
    }
  }

  const mouseLeaveHandler = () => {
    if (!itemRef.current) return

    const draggable = !!itemRef.current.dataset.draggable

    if (!drag.isDragging || draggable) return

    dragPosition.current = null

    prev.toggle({ state: "disappearing", height: prev.ghost.height }, false, true)
    next.toggle({ state: "disappearing", height: next.ghost.height }, false, true)
  }

  const dropHandler = () => {
    if (!itemRef.current) return

    const draggable = !!itemRef.current.dataset.draggable

    if (!drag.isDragging || draggable) return

    columnsDispatch(removeItem({
      column: drag.columnId,
      item: drag.itemId
    }))

    columnsDispatch(addItemAt({
      column: columnId,
      refItem: item.id,
      item: drag.itemId,
      isBefore: dragPosition.current === "top"
    }))

    prev.forceRemoval()
    next.forceRemoval()
  }

  return (
    <div
      className="item-wrapper"
      onMouseLeave={mouseLeaveHandler}
      onMouseUp={dropHandler}
    >
      {prev.ghostItem}
      <div
        className="item"
        ref={itemRef}
        onMouseOver={mouseOverHandler}
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
      {next.ghostItem}
    </div>
  )
}
