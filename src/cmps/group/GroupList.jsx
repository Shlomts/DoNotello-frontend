import { GroupDetails } from '../group/GroupDetails.jsx'


export function GroupList({ groups }) {
    if (!groups || !groups.length === 0) return <div>No groups to show</div>

    return (
        // <section className="group-list">
        //     < ul >
        //         <li >
        //             <GroupDetails />
        //         </li>
        //     </ul >
        // </section >

        <section>
            <ul className="group-list">
                {groups.map(group =>
                    <li
                        key={group._id}>
                        <GroupDetails
                            group={group}
                        />
                    </li>)
                }
            </ul>
        </section>
    )
}