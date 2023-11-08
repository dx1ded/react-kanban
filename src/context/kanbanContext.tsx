import { createContext, ReactNode } from "react"
import { useColumnsContext } from "../hooks/useColumns"
import { useItemsContext } from "../hooks/useItems"

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
      columns: useColumnsContext([]),
      items: useItemsContext([])
    }}>
      {children}
    </KanbanContext.Provider>
  )
}
