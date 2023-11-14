import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { useItems } from "../../hooks/useItems"
import "./Tag.scss"

interface PropsType {
  itemId: string,
  tag: string,
  index: number
}

export function Tag({ itemId, tag, index }: PropsType) {
  const { dispatch, editTag, removeTag } = useItems()

  const changeTag = (e: ContentEditableEvent, index: number) => {
    dispatch(editTag({
      itemId,
      index,
      name: e.target.value
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
      <ContentEditable
        tagName="span"
        className="item__tag-name"
        html={tag}
        onChange={(e) => changeTag(e, index)}
      />
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
