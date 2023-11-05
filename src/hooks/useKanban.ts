type ItemType = {
  title: string,
  description: string,
  tags: string[]
}

type StateType = {
  columns: {
    name: string,
    items: ItemType[]
  }[]
}

type ActionType = {
  type: string,
  payload?: any
}

const initialState: StateType = {
  columns: []
}

const enum {
  "ADD_ITEM" = "ADD_ITEM"
}

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch ()
}
