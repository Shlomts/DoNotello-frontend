import { Fragment } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

import { CardLabels } from "../group/miniCmps/CardLabels.jsx"
import { CardMembers } from "../group/miniCmps/CardMembers.jsx"
import { CardIcons } from "../group/miniCmps/CardIcons.jsx"

export function CardPreview({ card, board }) {
    const { boardId } = useParams()

    if (!card || !board.members || board.members.length === 0 || !board.labels || board.labels.length === 0) return

    const cardMembers = board.members.filter(member => card.memberIds.includes(member.id))
    const cardLabels = board.labels.filter(label => card.labelIds.includes(label.id))
    const cardHasContent = card.memberIds.length > 0

    return (
        <Fragment>
            <NavLink to={`/board/${boardId}/card/${card.id}`}>
                <div className={`card-preview ${cardHasContent ? 'expanded' : ''}`}>
                    <CardLabels labels={cardLabels} />
                    <h3>{card.title}</h3>
                    <section className="bottom-card-preview">
                    <CardIcons card={card} />
                    <CardMembers members={cardMembers} />
                    </section>
                </div>
            </NavLink>
            {/* <section> */}
                <Outlet />
            {/* </section> */}
        </Fragment>
    )
}