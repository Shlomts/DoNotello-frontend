import { GroupDetails } from "../group/GroupDetails.jsx"

export function GroupList({ board, groups, onRemoveGroup }) {
    if (!groups || !groups.length === 0) return <div>No groups to show</div>

    return (
        <section>
            <ul className="group-list">
                {groups.map((group) => (
                    <li key={group.id}>
                        <GroupDetails
                            board={board}
                            group={group}
                            onRemoveGroup={onRemoveGroup}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
