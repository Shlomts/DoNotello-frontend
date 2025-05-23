import { Plus } from "../SvgContainer.jsx"
import { useEffect, useRef, useState } from "react"

import { CardList } from "../card/CardList.jsx"
import { showSuccessMsg, showErrorMsg, } from "../../services/event-bus.service.js"
import { Close } from "../SvgContainer.jsx"
import { addCardToGroup } from "../../store/actions/board.actions.js"
import { boardService } from "../../services/board"
import { useClickOutside } from "../../customHooks/useClickOutside.js"


export function GroupDetails({ board, group, onRemoveGroup }) {
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [cardName, setCardName] = useState('')
    const addCardRef = useRef(null)

    useClickOutside(addCardRef, () => setIsAddingCard(false))

    function onSetCardName(ev) {
        const name = ev.target.value
        setCardName(name)
    }

    async function onAddCard() {
        const cardToSave = boardService.getEmptyCard()
        if (cardName === '') {
            setIsAddingCard(false)
            return
        }
        cardToSave.title = cardName

        try {
            await addCardToGroup(board, group, cardToSave)
            showSuccessMsg(`Board updated, new card: ${cardToSave.title}`)
            setCardName('')
        } catch (err) {
            console.error(err)
            showErrorMsg("Cannot add card")
        }
    }


    if (!group) return <div>Loading...</div>

    return (
        <section className="group-details">
            <div className="group-header">
                <h3>{group.title}</h3>
                <button className="remove-group-btn"
                    onClick={() => {
                        if (!confirm('Sure?')) return
                        onRemoveGroup(group.id)
                    }}>
                    <Close />
                </button>
            </div>
            <div
                className={`group-cards ${!group.cards || group.cards.length === 0 ? "empty" : ""}`}
            >
                <CardList
                    cards={group.cards}
                    board={board}
                    group={group}
                />
            </div>
            <div className="group-footer" ref={addCardRef}>
                {isAddingCard ? (
                    <div className="add-card-form">
                        <textarea
                            value={cardName}
                            onChange={onSetCardName}
                            placeholder="Enter a title or paste link"
                            autoFocus
                            onBlur={() => setIsAddingCard(false)}
                            onKeyDown={ev => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault()
                                    onAddCard()
                                }
                            }}
                        />
                        <div className="add-card-actions">
                            <button
                                className="save-card-btn"
                                onMouseDown={ev => ev.preventDefault()}
                                onClick={() => { onAddCard() }}
                            >
                                Add card
                            </button>
                            <button
                                className="cancel-add-btn"
                                onMouseDown={ev => ev.preventDefault()}
                                onClick={() => {
                                    setIsAddingCard(false)
                                    setCardName('')
                                }}
                            >
                                <Close />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="add-card">
                        <button
                            className="add-card-btn"
                            onClick={() => {
                                setIsAddingCard(true)
                            }}
                        >
                            <Plus />
                            Add a card
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
