import { useState } from "react"

export function CardMembers({ members }) {
    const [selectedMember, setSelectedMember] = useState(null)

    function toggleMemberPopup(ev, member) {
        ev.preventDefault()
        ev.stopPropagation()

        setSelectedMember(prevMember =>
            prevMember && prevMember.id === member.id ? null : member
        )
    }

    if (!members || members.length === 0) return null

    return (
        <div className="member-avatars">
            {members.map(member => (
                <div
                    key={member.id}
                    className="card-member-img-container"
                    onClick={(ev) => toggleMemberPopup(ev, member)}
                >
                    <img
                        src={member.imgUrl}
                        alt={member.fullname}
                        title={member.fullname}
                        className="card-member-img"
                    />

                    {selectedMember && selectedMember.id === member.id && (
                        <div
                            className="member-details-popup">
                            <button className="close-btn" onClick={() => setSelectedMember(null)}>x</button>
                            <div className="member-info">
                                <img
                                    src={member.imgUrl}
                                    alt={member.fullname}
                                    className="member-popup-img"
                                />
                                <h3>{member.fullname}</h3>
                                <p>{member.username}</p>
                            </div>
                            <button>View profile</button>
                            <button>Remove from card</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}