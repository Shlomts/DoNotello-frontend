import { useState } from "react"

export function CardLabels({ labels }) {
    const [showLabelTitle, setShowLabelTitle] = useState(false)

    function toggleLabelTitles(ev) {
        ev.preventDefault(ev)
        setShowLabelTitle(prev => !prev)
    }

    if (!labels || labels.length === 0) return null

    return (
        <div className="card-labels">
            {labels.map(label => (
                <span
                    key={label.id}
                    style={{ backgroundColor: label.color }}
                    className="card-label"
                    title={label.title}
                    onClick={toggleLabelTitles}
                >
                    {showLabelTitle && (<span className="label-title">{label.title}</span>)}
                </span>
            ))}
        </div>
    )
}