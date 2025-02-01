import { GroupDetails } from "../group/GroupDetails.jsx"
import { Droppable, Draggable } from 'react-beautiful-dnd'


export function GroupList({ board, groups, onRemoveGroup }) {
    if (!groups || groups.length === 0) return null

    function getStyle(style, snapshot) {
        if (snapshot.isDragging) {
            return {
                ...style,
                transform: `${style?.transform || ""} rotate(5deg)`,
                transition: "transform 0.2 ease",
            }
        }

        if (snapshot.isDropAnimating) {
            const { moveTo, curve, duration } = snapshot.dropAnimation
            const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`

            return {
                ...style,
                transform: translate,
                transition: `transform ${curve} ${duration}s`,
            }
        }

        return style
    }

    return (
        <Droppable droppableId="group-list" direction="horizontal" type="group">
            {(provided, snapshot) => (
                <ul className=
                    {`group-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {groups.map((group, index) => (
                        <Draggable key={group.id} draggableId={group.id} index={index} type='group' >
                            {(provided, snapshot) => (
                                < li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getStyle(provided.draggableProps.style, snapshot)}
                                    className={`draggable-container ${snapshot.isDragging ? "isDragging" : ""}`}
                                >
                                    <GroupDetails
                                        board={board}
                                        group={group}
                                        onRemoveGroup={onRemoveGroup}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable >
    )
}

