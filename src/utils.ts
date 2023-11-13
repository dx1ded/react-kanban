export function* generateColors(): Generator<string> {
  yield "#00B294"
  yield "#7678D1"
  yield "#C94AA8"
  yield "#DA3A3A"
  yield* generateColors()
}

export const HIDDEN_CLASSNAME = "visually-hidden"
