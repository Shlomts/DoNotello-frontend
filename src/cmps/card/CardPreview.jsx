import { Fragment } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

import { CardLabels } from "../group/miniCmps/CardLabels.jsx"
import { CardMembers } from "../group/miniCmps/CardMembers.jsx"
import { CardIcons } from "../group/miniCmps/CardIcons.jsx"
import { CardDates } from "./CardDates.jsx"

export function CardPreview({ card, cardMembers, cardLabels }) {
    const { boardId, cardId } = useParams()

    // if (!card || !board.members || board.members.length === 0 || !board.labels || board.labels.length === 0) return
    if (!card) return null

    const cardHasContent = card.memberIds.length > 0
    const hasCover = card.style && card.style.backgroundColor

    return (
        <Fragment>
            <NavLink
                to={`/board/${boardId}/card/${card.id}`}
                // state={{ cardMembers, cardLabels }}
            >
                <div className={`card-preview ${cardHasContent ? 'expanded' : ''}`}>
                    {hasCover && (
                        <div
                            className="card-cover"
                            style={{
                                backgroundColor: card.style.backgroundColor,
                            }}
                        />
                    )}

                    <div className="card-preview-content">
                        <CardLabels
                            labels={cardLabels}
                            className='card-preview-labels'
                            isCardPreview={true}
                        />
                        <h3>{card.title}</h3>

                        <section className="bottom-card-preview">
                            {/* <CardDates dates={card.dates} isDone={card.isDone} /> */}
                            <CardIcons card={card} />
                            <CardMembers members={cardMembers} />
                        </section>
                    </div>
                </div>
            </NavLink>
            {/* <section> */}
            {cardId && cardId === card.id && <Outlet />}
            {/* </section> */}
        </Fragment>
    )
}