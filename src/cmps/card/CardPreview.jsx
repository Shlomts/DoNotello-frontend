import { Fragment } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

export function CardPreview({ card, members }) {
    const { boardId } = useParams()

    const cardMembers = members.filter(member => card.memberIds.includes(member.id))
    const cardHasContent = card.memberIds.length > 0

    return (
        <Fragment>
            <NavLink to={`/board/${boardId}/card/${card.id}`}>
                <div className={`card-preview ${cardHasContent ? 'expanded' : ''}`}>
                    <h3>{card.title}</h3>
                    {cardMembers.length > 0 && (
                        <div className="member-avatars">
                            {cardMembers.map(member => (
                                <img
                                    key={member.id}
                                    src={member.imgUrl}
                                    alt={member.fullname}
                                    title={member.fullname}
                                    className="card-member-img"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </NavLink>
            <section>
                <Outlet />
            </section>
        </Fragment>
    )
}