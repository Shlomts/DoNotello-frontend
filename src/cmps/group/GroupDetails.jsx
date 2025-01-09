import { CardList } from '../card/CardList.jsx'

export function GroupDetails({ group }) {
    return (
        <section className="group-details">
            <div className="group-header">
                <h3>{group.title}</h3>
                <span>#</span>
            </div>
            <div className={`group-cards ${!group.cards || group.cards.length === 0 ? "empty" : ""}`}
            >
                <CardList
                    cards={group.cards}
                />
            </div>
            <div className="group-footer">
                <span>+ add card</span>
            </div>
        </section>
    )

}