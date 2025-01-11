import { CardPreview } from './CardPreview'


export function CardList({ cards }) {
    if (!cards || !cards.length === 0) return <div>No cards to show</div>

    return (
        // <section>
        //     <ul className="card-list">
        //         <CardPreview />
        //     </ul>
        // </section>

        <section>
            <ul className="card-list">
                {cards.map(card =>
                    <li
                        key={card.id}>
                        <CardPreview
                            card={card}
                        />
                    </li>
                )}
            </ul>
        </section>
    )
}