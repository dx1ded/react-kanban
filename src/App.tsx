import { useColumns } from "./hooks/useColumns"
import { Column } from "./components/Column/Column"
import { AddColumn } from "./components/Column/AddColumn"
import "./App.scss"

export function App() {
  const { state } = useColumns()

  return (
    <div className="app">
      <div className="container">
        {state.map((column) => <Column key={column.id} column={column} />)}
        <AddColumn />
      </div>
    </div>
  )
}
