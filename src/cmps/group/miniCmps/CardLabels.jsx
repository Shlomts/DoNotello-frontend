import { useState } from "react"
import { Plus } from "../../SvgContainer"

export function CardLabels({ labels, showTitles = false, onLableCick, onPlusIcon }) {
    const [showLabelTitle, setShowLabelTitle] = useState(showTitles)

    function handleClickLabel(ev, label) {
        ev.preventDefault(ev)
        if (onLableCick) {
            onLableCick(label)
        } else {
            setShowLabelTitle(prev => !prev)
        }
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
                    onClick={(ev) => handleClickLabel(ev, label)}
                >
                    {showLabelTitle && (<span className="label-title">{label.title}</span>)}
                </span>
            ))}
            <span
                className='add-labels-icon'
                onClick={(ev) => {
                    ev.preventDefault()
                    if (onPlusIcon) onPlusIcon()
                }}>
                <Plus />
            </span>

        </div>
    )
}