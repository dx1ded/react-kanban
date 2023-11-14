import { Reducer, ReducerState, ReducerAction, Dispatch, useEffect, useReducer } from "react"

export const useReducerWithAfterware = <R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  afterwareFn: (state: ReducerState<R>) => void
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Used useEffect because we need a copy of the state right after dispatch is invoked
  useEffect(() => {
    afterwareFn(state)
  }, [state, afterwareFn])

  return [state, dispatch]
}
