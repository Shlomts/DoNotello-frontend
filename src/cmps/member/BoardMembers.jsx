
export function BoardMembers({ members }) {

    function getInitials(fullname) {
        return fullname.split(' ').map(name => name[0].toUpperCase()).join('')
    }

    const membersToDisplay = members.slice(0, 5)
    const hiddenMembersCount = members.length - 5

    return (
        <section>
            <ul className="board-members">
                {membersToDisplay.map((member) => (
                    <li key={member.id} className="member-stacking">
                        <span className="member-img">
                            {member.imgUrl ? (
                                <img src={member.imgUrl} alt={member.fullname} />
                            ) : (
                                <span className="memeber-initials">
                                    {getInitials(member.fullname)}
                                </span>
                            )}
                        </span>
                    </li>
                ))}
                {hiddenMembersCount > 0 && (
                    <span className="more-members">+{hiddenMembersCount}</span>
                )}
            </ul>
        </section>
    )
}