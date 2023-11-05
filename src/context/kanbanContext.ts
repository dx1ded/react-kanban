import { createContext } from "react"

type ItemType = {
  title: string,
  description: string,
  tags: string[]
}

type KanbanType = {
  columns: {
    name: string,
    items: ItemType[]
  }[]
}

const kanban: KanbanType = {
  columns: []
}

export const kanbanContext = createContext<KanbanType>(kanban)
