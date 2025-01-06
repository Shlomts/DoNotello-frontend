import { CardList } from '../card/CardList.jsx'

export function GroupDetails() {
    return (
        <section className="group-details">
            <div className="group-header">
                <h3>enter list name</h3>
                <span>#</span>
            </div>
            <div className="group-cards">
                <CardList />
            </div>
            <div className="group-footer">
                <span>+ add card</span>
            </div>
        </section>
    )

}