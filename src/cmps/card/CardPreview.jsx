import { NavLink, Outlet } from "react-router-dom"

export function CardPreview({ card }) {
    return (
        <div className="card-preview">
            <h3>{card.title}</h3>
            <nav>
                <NavLink to="card/:cardId">Card</NavLink>
            </nav>
            <section>
                <Outlet />
            </section>
        </div>
    )
}
