import { NavLink, Outlet } from 'react-router-dom'

export function CardPreview() {
    return (
        <div>
            <nav>
                <NavLink to="card/:cardId">Card</NavLink>
            </nav>
            <section>
                <Outlet />
            </section>
            I am Card Preview
        </div>
    )
}
