import { useState } from "react"
import { Plus } from "../../SvgContainer"
import { toggleLabelVisibility } from "../../../store/actions/board.actions"
import { useDispatch, useSelector } from "react-redux"

export function CardLabels({ labels, className, isCardPreview = false, onPlusIcon }) {
    const dispatch = useDispatch()
    const showLabelTitle = useSelector(state => state.boardModule.labelVisibility)

    if (!labels || labels.length === 0) return null

    function handleClickLabel(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (isCardPreview) {
            dispatch(toggleLabelVisibility())
        }
    }


    return (
        <div className={`card-labels ${className}`}>
            {labels.map(label => (
                <span
                    key={label.id}
                    style={{ backgroundColor: label.color }}
                    className="card-label"
                    title={label.title}
                    onClick={handleClickLabel}
                >
                    {
                        (isCardPreview ? showLabelTitle : true) && (
                            <span className="label-title">{label.title}</span>
                        )
                    }
                </span>
            ))}
            {className === "card-details-labels" && (
                <span
                    className="add-labels-icon"
                    onClick={(ev) => {
                        ev.preventDefault()
                        if (onPlusIcon) onPlusIcon()
                    }}
                >
                    <Plus />
                </span>
            )}
        </div>
    )
}