import { GroupDetails } from '../group/GroupDetails.jsx'


export function GroupList() {
    return (
        <section className="group-list">
            < ul >
                <li >
                    <GroupDetails />
                </li>
            </ul >
        </section >

        // <section>
        //     <ul className="group-list">
        //         {groups.map(group =>
        //             <li key={group._id}>
        //                 <GroupDetails group={group} />
        //             </li>)
        //         }
        //     </ul>
        // </section>
    )
}