import "./App.scss"
import { AddColumn, Column } from "./components/Column/Column"

export function App() {
  return (
    <div className="app">
      <div className="container">
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <AddColumn />
      </div>
    </div>
  )
}
