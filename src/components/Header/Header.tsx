import { useColumns } from "../../hooks/useColumns"
import { useItems } from "../../hooks/useItems"
import { LOCALSTORAGE_COLUMNS, LOCALSTORAGE_ITEMS } from "../../utils"
import "./Header.scss"

export function Header() {
  const { dispatch: columnsDispatch, clearColumns } = useColumns()
  const { dispatch: itemsDispatch, clearItems } = useItems()

  const clearKanban = () => {
    columnsDispatch(clearColumns())
    itemsDispatch(clearItems())

    localStorage.removeItem(LOCALSTORAGE_COLUMNS)
    localStorage.removeItem(LOCALSTORAGE_ITEMS)
  }

  return (
    <header className="header">
      <h1 className="header__title">Drag n Drop</h1>
      <button className="header__clear" onClick={clearKanban}>Clear Kanban</button>
    </header>
  )
}
