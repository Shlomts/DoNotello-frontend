import { Fragment } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

export function CardPreview({ card }) {
    const { boardId } = useParams()

    return (
        <Fragment>
            <NavLink to={`/board/${boardId}/card/${card.id}`}>
                <div className="card-preview">
                    <h3>{card.title}</h3>
                </div>
            </NavLink>
            <section>
                <Outlet />
            </section>
        </Fragment>
    )
}