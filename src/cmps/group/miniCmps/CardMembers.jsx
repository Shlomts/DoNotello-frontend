import { useState } from "react"
import { createPortal } from "react-dom"
import { getPopupPosition } from "../../../services/util.service"
import Close from "../../SvgContainer.jsx"

export function CardMembers({ members }) {
    const [popupPosition, setPopupPosition] = useState(null)
    const [selectedMember, setSelectedMember] = useState(null)

    function toggleMemberPopup(ev, member) {
        ev.preventDefault()
        ev.stopPropagation()

        const newPopupPosition = getPopupPosition(ev.currentTarget)

        setSelectedMember(prevMember =>
            prevMember && prevMember.id === member.id ? null : member
        )

        if (!selectedMember || selectedMember.id !== member.id) {
            setPopupPosition(newPopupPosition)
        }
    }

    if (!members || members.length === 0) return null

    return (
        <div className="card-members">
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

                    {selectedMember && selectedMember.id === member.id &&
                        createPortal(
                            <div
                                className="member-details-popup"
                                style={{
                                    position: "absolute",
                                    top: popupPosition?.top || 0,
                                    left: popupPosition?.left || 0,
                                }}
                            >
                                <div className="member-details-popup-header">
                                    <button
                                        className="close-btn"
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            setSelectedMember(null)
                                        }}
                                    >
                                        x
                                    </button>
                                </div>

                                <div className="member-popup-img">
                                    <img
                                        src={member.imgUrl}
                                        alt={member.fullname}
                                    />
                                </div>

                                <div className="member-info">
                                    <h3>{member.fullname}</h3>
                                    <p>{member.username}</p>
                                </div>

                                <div className="popup-actions">
                                    <button>View profile</button>
                                    <button>Remove from card</button>
                                </div>
                            </div>,
                            document.body
                        )}
                </div>
            ))}
        </div>
    )
}