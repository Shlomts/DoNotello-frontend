import { GroupDetails } from "../group/GroupDetails.jsx"
import { DragDropHandler } from "../DragDropHandler.jsx"
import { Droppable, Draggable } from 'react-beautiful-dnd'


export function GroupList({ board, groups, onRemoveGroup }) {
    if (!groups || groups.length === 0) return null

    return (
        // <DragDropHandler board={board}>
        <Droppable droppableId="group-list" direction="horizontal" type="group">
            {(provided) => (
                <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {groups.map((group, index) => (
                        <Draggable key={group.id} draggableId={group.id} index={index} type = 'group' >
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
    )
}
            </Droppable >
        // </DragDropHandler >
    )
}

