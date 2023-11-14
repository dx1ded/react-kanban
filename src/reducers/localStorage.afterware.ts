export const LocalStorageAfterware = (fieldName: string) => (state: unknown) => {
  const serializedState = JSON.stringify(state)

  localStorage.setItem(fieldName, serializedState)
}
