import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { KanbanProvider } from "./context/kanbanContext"
import { DragProvider } from "./context/dragContext"
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KanbanProvider>
      <DragProvider>
        <App />
      </DragProvider>
    </KanbanProvider>
  </React.StrictMode>,
)
