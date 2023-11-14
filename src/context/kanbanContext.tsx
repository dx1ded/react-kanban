import { createContext, ReactNode } from "react"
import { useColumnsContext } from "../hooks/useColumns"
import { useItemsContext } from "../hooks/useItems"
import { LOCALSTORAGE_COLUMNS, LOCALSTORAGE_ITEMS } from "../utils"

interface KanbanContextType {
  columns: ReturnType<typeof useColumnsContext>,
  items: ReturnType<typeof useItemsContext>
}

const kanban: KanbanContextType = {
  columns: {
    state: [],
    dispatch() {}
  },
  items: {
    state: [],
    dispatch() {}
  }
}

export const KanbanContext = createContext<KanbanContextType>(kanban)

export function KanbanProvider({ children }: { children?: ReactNode }) {
  return (
    <KanbanContext.Provider value={{
      columns: useColumnsContext(JSON.parse(localStorage.getItem(LOCALSTORAGE_COLUMNS) || "[]")),
      items: useItemsContext(JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS) || "[]"))
    }}>
      {children}
    </KanbanContext.Provider>
  )
}
