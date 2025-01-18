import { CardPreview } from './CardPreview'


export function CardList({ cards, board }) {
    if (!cards || !cards.length === 0) return ''

    return (
        <section>
            <ul className="card-list">
                {cards.map(card =>
                    <li
                        key={card.id}>
                        <CardPreview
                            card={card}
                            board={board}
                        />
                    </li>
                )}
            </ul>
        </section>
    )
}