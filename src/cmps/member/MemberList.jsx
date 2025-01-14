
export function MemberList({ members }) {
    return (
        <section>
            <ul className="member-list">
                {members.map((member) => (
                    <li key={member.id} className="member-stacking">
                        <span className="member-img">
                            {member.imgUrl && 
                            <img src={member.imgUrl} alt={member.fullname} />}
                        </span>
                        {/* <GroupDetails
                            board={board}
                            group={group}
                            onRemoveGroup={onRemoveGroup}
                        /> */}
                    </li>
                ))}
            </ul>
        </section>
    )
}