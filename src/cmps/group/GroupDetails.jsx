import { CardList } from '../card/CardList.jsx'

export function GroupDetails({ group }) {
    return (
        <section className="group-details">
            <div className="group-header">
                <h3>{group.title}</h3>
                <span>#</span>
            </div>
            <div className="group-cards">
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