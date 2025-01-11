import { useEffect, useState } from "react"

import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"
import { CardList } from "../card/CardList.jsx"

export function GroupDetails({ group }) {
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [cardName, setCardName] = useState(null)

    async function onAddCard() {
        const cardToSave = { title: groupName }
        try {
            addGroupToBoard(board, groupToSave)
            showSuccessMsg(`Board updated, new list: ${groupToSave.title}`)
        } catch (err) {
            showErrorMsg("Cannot add lisr")
        }
    }

    return (
        <section className="group-details">
            <div className="group-header">
                <h3>{group.title}</h3>
                <span>#</span>
            </div>
            <div
                className={`group-cards ${
                    !group.cards || group.cards.length === 0 ? "empty" : ""
                }`}
            >
                <CardList cards={group.cards} />
            </div>
            <div className="group-footer">
                <span className="add-card-btn" onClick={() => onAddCard()}>
                    + add card
                </span>
            </div>
        </section>
    )
}

<section className="add-card">
{isAddingGroup ? (
    <div className="add-group-form">
        <textarea
            value={groupName}
            onChange={onSetGroupName}
            placeholder="Enter"
            rows={3}
        />
        <div className="add-group-actions">
            <button
                className="add-group-btn"
                onClick={() => {
                    onAddGroup()
                }}
            >
                Add list
            </button>
            <button
                className="cancel-add-btn"
                onClick={() => {
                    setIsAddingGroup(false)
                    setGroupName(null)
                }}
            >
                X
            </button>
        </div>
    </div>
) : (
    <button
        className="add-group-btn"
        onClick={() => {
            setIsAddingGroup(true)
        }}
    >
        + Add another list
    </button>
)}
</section>