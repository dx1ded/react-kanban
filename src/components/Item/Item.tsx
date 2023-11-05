import "./Item.scss"

export function Item() {
  return (
    <div className="item">
      <h4 className="item__title">Twilio integration</h4>
      <p className="item__description">
        Create new note via SMS. Support text, audio, links, and media.
      </p>
      <div className="item__tags">
        <span className="item__tag">Formatting</span>
        <span className="item__tag">Note interface</span>
        <span className="item__tag">Essential</span>
        <span className="item__tag">New note</span>
        <span className="item__tag">Urgent</span>
      </div>
    </div>
  )
}

export function AddItem() {
  return (
    <button type="button" className="add-item" aria-label="Add new item">+</button>
  )
}
