import { CardPreview } from './CardPreview'


export function CardList({ cards }) {

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
                        key={card._id}>
                        <CardPreview
                            card={card}
                        />
                    </li>
                )}
            </ul>
        </section>
    )
}