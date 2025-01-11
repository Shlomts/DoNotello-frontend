import { Plus } from "../SvgContainer.jsx"
import { useState } from "react"

import { CardList } from "../card/CardList.jsx"
import {
    showSuccessMsg,
    showErrorMsg,
} from "../../services/event-bus.service.js"
import { Close } from "../SvgContainer.jsx"
import { addCardToGroup } from "../../store/actions/board.actions.js"

export function GroupDetails({ board, group, onRemoveGroup }) {
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [cardName, setCardName] = useState(null)

    function onSetCardName(ev) {
        const name = ev.target.value
        setCardName(name)
    }

    async function onAddCard() {
        const cardToSave = { title: cardName }
        try {
            addCardToGroup(board, group, cardToSave)
            showSuccessMsg(`Board updated, new card: ${cardToSave.title}`)
        } catch (err) {
            showErrorMsg("Cannot add card")
        }
    }

    if (!group) return <div>Loading...</div>

    return (
        <section className="group-details">
            <div className="group-header">
                <h3>{group.title}</h3>
                <button className="remove-group-btn"
                    onClick={() => onRemoveGroup(group.id)}>
                    <Close />
                </button>
            </div>
            <div
                className={`group-cards ${!group.cards || group.cards.length === 0 ? "empty" : ""
                    }`}
            >
                <CardList cards={group.cards} />
            </div>
            <div className="group-footer">
                {/* <span className="add-card-btn" onClick={() => onAddCard()}>
                    <Plus />
                    Add card
                </span> */}

                <section className="add-card">
                    {isAddingCard ? (
                        <div className="add-card-form">
                            <textarea
                                value={cardName}
                                onChange={onSetCardName}
                                placeholder="Enter"
                                rows={3}
                            />
                            <div className="add-card-actions">
                                <span
                                    className="add-card-btn"
                                    onClick={() => {
                                        onAddCard()
                                    }}
                                >
                                    Add card
                                </span>
                                <button
                                    className="cancel-add-btn"
                                    onClick={() => {
                                        setIsAddingCard(false)
                                        setCardName(null)
                                    }}
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="add-card-btn"
                            onClick={() => {
                                setIsAddingCard(true)
                            }}
                        >
                            <Plus />
                            Add another list
                        </button>
                    )}
                </section>
            </div>
        </section>
    )
}
