import { GroupDetails } from "../group/GroupDetails.jsx"
import { DragDropHandler } from "../DragDropHandler.jsx"
import { Droppable, Draggable } from 'react-beautiful-dnd'


export function GroupList({ board, groups, onRemoveGroup }) {
    if (!groups || groups.length === 0) return <div>No groups to show</div>

    return (
        <DragDropHandler board={board}>
            <Droppable droppableId="group-list" direction="horizontal">
                {(provided) => (
                    <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {groups.map((group, index) => (
                            <Draggable key={group.id} draggableId={group.id} index={index}>
                                {(provided) => (
                                    < li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
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
            </Droppable>
        </DragDropHandler >
    )
}

