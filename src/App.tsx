import "./App.scss"
import { Column } from "./components/Column/Column"

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
      </div>
    </div>
  )
}
