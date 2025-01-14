import { CardPreview } from './CardPreview'


export function CardList({ cards, board }) {
    if (!cards || !cards.length === 0) return <div>No cards to show</div>

    return (
        <section>
            <ul className="card-list">
                {cards.map(card =>
                    <li
                        key={card.id}>
                        <CardPreview
                            card={card}
                            members={board.members}
                        />
                    </li>
                )}
            </ul>
        </section>
    )
}