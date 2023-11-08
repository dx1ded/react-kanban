import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { KanbanProvider } from "./context/kanbanContext"
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </React.StrictMode>,
)
