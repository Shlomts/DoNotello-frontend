import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return <article className="preview">
        <header>
            <Link to={`/board/${board._id}`}>{board.vendor}</Link>
        </header>

        <p>Speed: <span>{board.speed.toLocaleString()} Km/h</span></p>
        {board.owner && <p>Owner: <span>{board.owner.fullname}</span></p>}
        
    </article>
}