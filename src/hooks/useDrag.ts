import { useContext } from "react"
import { DragContext } from "../context/dragContext"

export const useDrag = () => {
  const { drag, setDrag } = useContext(DragContext)

  return { drag, setDrag }
}