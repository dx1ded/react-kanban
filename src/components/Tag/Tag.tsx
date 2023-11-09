import { ChangeEvent } from "react"
import { useItems } from "../../hooks/useItems"
import "./Tag.scss"

interface PropsType {
  itemId: string,
  tag: string,
  index: number
}

export function Tag({ itemId, tag, index }: PropsType) {
  const { dispatch, editTag, removeTag } = useItems()

  const changeTag = (e: ChangeEvent<HTMLSpanElement>, index: number) => {
    const value = e.target.textContent || ""

    dispatch(editTag({
      itemId,
      index,
      name: value
    }))
  }

  const deleteTag = (index: number) => {
    dispatch(removeTag({
      itemId,
      index
    }))
  }

  return (
    <div className="item__tag">
      <span
        className="item__tag-remove"
        aria-label="Remove tag"
        onClick={() => deleteTag(index)}
      >+</span>
      <span
        className="item__tag-name"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e: ChangeEvent<HTMLSpanElement>) => changeTag(e, index)}
      >{tag}</span>
    </div>
  )
}

export function AddTag({ itemId }: Pick<PropsType, "itemId">) {
  const { dispatch, addTag } = useItems()

  const addNewTag = () => {
    dispatch(addTag({
      itemId,
      name: "New tag"
    }))
  }

  return (
    <span
      className="item__tag add-tag"
      aria-label="Add new tag"
      onClick={addNewTag}
    >+</span>
  )
}
