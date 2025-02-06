import { Description } from "./../../svgContainer"

export function CardIcons({ card }) {
    if (!card.description) return
    return (
        <div className="card-icons">
            {card.description && <span className="icon-description"><Description /></span>}
        </div>
    )
}