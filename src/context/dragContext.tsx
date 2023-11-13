import React, { useState, createContext, ReactNode } from "react"
import { ColumnType } from "../reducers/columns/reducer"
import { ItemType } from "../reducers/items/reducer"

interface DragType {
  columnId: ColumnType["id"],
  itemId: ItemType["id"],
  isDragging: boolean,
}

const defaultDrag: DragType = {
  columnId: "",
  itemId: "",
  isDragging: false
}

interface DragContextType {
  drag: DragType,
  setDrag: React.Dispatch<React.SetStateAction<DragType>>
}

const drag: DragContextType = {
  drag: defaultDrag,
  setDrag() {}
}

export const DragContext = createContext<DragContextType>(drag)

export function DragProvider({ children }: { children?: ReactNode }) {
  const [drag, setDrag] = useState<DragType>(defaultDrag)

  return (
    <DragContext.Provider value={{ drag, setDrag }}>
      {children}
    </DragContext.Provider>
  )
}
