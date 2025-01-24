import { useRef } from "react"
import { GroupDetails } from "../group/GroupDetails.jsx"
import { Droppable, Draggable } from 'react-beautiful-dnd'


export function GroupList({ board, groups, onRemoveGroup }) {
    if (!groups || groups.length === 0) return null

    function getStyle(style, snapshot, elementRef) {
        if (snapshot.isDragging && elementRef?.current) {
            const actualHeight = elementRef.current.offsetHeight
            // console.log('actual height:', actualHeight)
            return {
                ...style,
                transform: `${style?.transform || ""} rotate(5deg)`,
                height: `${actualHeight}px`,
                transition: "transform 0.2 ease",
                zIndex: 10,
            }
        }

        if (snapshot.isDropAnimating) {
            const { moveTo, curve, duration } = snapshot.dropAnimation
            const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`

            return {
                ...style,
                transform: translate,
                transition: `all ${curve} ${duration}s`,
            };
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
                    {groups.map((group, index) => {
                        const elementRef = useRef(null)
                        return (
                            <Draggable key={group.id} draggableId={group.id} index={index} type='group' >
                                {(provided, snapshot) => (
                                    < li
                                        ref={(ref) => {
                                            provided.innerRef(ref)
                                            elementRef.current = ref
                                        }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getStyle(provided.draggableProps.style, snapshot, elementRef)}
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
                        )
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable >
    )
}

