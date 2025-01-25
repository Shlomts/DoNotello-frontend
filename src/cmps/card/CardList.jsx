
import { CardPreview } from './CardPreview'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export function CardList({ cards, board, group }) {
    if (!cards || cards.length === 0) return null

    function getStyle(style, snapshot) {
        if (snapshot.isDragging) {
            return {
                ...style,
                transform: `${style?.transform || ""} rotate(5deg)`,
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
        <Droppable droppableId={group.id} direction='vertical' type='card'>
            {(provided, snapshot) => (
                <ul className=
                    {`card-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index} type='card'>
                            {(provided, snapshot) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getStyle(provided.draggableProps.style, snapshot)}
                                    className={`draggable-container ${snapshot.isDragging ? "isDragging" : ""}`}

                                >
                                    <CardPreview
                                        card={card}
                                        board={board}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}