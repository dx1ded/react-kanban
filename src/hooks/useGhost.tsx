import { useState, useRef, useMemo } from "react"

interface GhostItem {
  state: "none" | "appearing" | "disappearing",
  height: number,
  // 0 - 100 (%)
  heightRatio: number,
  // In ms
  delay: number
}

export const useGhost = (className: string) => {
  const [ghost, setGhost] = useState<GhostItem>({
    state: "none",
    height: 0,
    heightRatio: 0,
    delay: 8
  })
  const intervalRef = useRef<number | null>(null)

  const forceRemoval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setGhost((prevState) => ({
      ...prevState,
      state: "none",
      height: 0,
      heightRatio: 0
    }))
  }

  const toggle = (
    { state, height }: Pick<GhostItem, "state" | "height">,
    // Means if there's an existing interval, another won't be created
    withNoInterval = false,
    /*
      Removes excessive operations. For example:
      if state is "appearing" and ghost.heightRatio is 100 OR
      if state is "disappearing" and ghost.heightRatio is 0
      ... then obviously we shouldn't toggle anything (unless we need that)
    */
    withOptimization = false
  ) => {
    if (withNoInterval && intervalRef.current) return

    if (withOptimization && (
      (state === "appearing" && ghost.heightRatio === 100) ||
      (state === "disappearing" && ghost.heightRatio === 0)
    )) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const ADD_BY: number = 4
    const defaultHeightRatio: number = state === "appearing" ? 0 : 100

    let times = 0

    setGhost((prevState) => ({
      ...prevState,
      state,
      height,
      /*
        If there's an existing interval (intervalRef.current) and the code went to this stage then it means we've skipped the if-statement using "withNoInterval" is false.
        In this case we make this statement for the situation when mouse is left before the ghost fully appeared or disappeared.
        Obviously we want the animation of disappearance to be soft, that's why we would start from the position it went to.
        Otherwise, we use defaultHeightRatio in case we start the animation from complete beginning.
       */
      heightRatio: intervalRef.current ? prevState.heightRatio : defaultHeightRatio
    }))

    const interval = setInterval(() => {
      if (times === 0) {
        // Set the interval
        intervalRef.current = interval
      }

      setGhost((prevState) => ({
        ...prevState,
        heightRatio: prevState.heightRatio + (state === "appearing" ? ADD_BY : -ADD_BY)
      }))

      times += ADD_BY

      // ghost.heightRatio < 0 is used because there's a bug with intervals and the value may be less than 0 which makes the animation messy.
      if (times >= 100 || ghost.heightRatio < 0) {
        if (state === "disappearing") {
          return forceRemoval()
        }

        clearInterval(interval)
        intervalRef.current = null
      }
    }, ghost.delay)
  }

  const ghostItem = useMemo(() => ghost.state !== "none" && (
    <span
      className={className}
      aria-hidden={true}
      style={{ height: `${ghost.height * ghost.heightRatio / 100}px` }}>
    </span>
  ), [ghost.height, ghost.heightRatio])

  return { ghost, ghostItem, toggle, forceRemoval, intervalRef }
}
