
import { CardPreview } from './CardPreview'
import { DragDropHandler } from '../DragDropHandler'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export function CardList({ cards, board, group }) {
    if (!cards || cards.length === 0) return null

    return (
        // <DragDropHandler board={board}>
        <Droppable droppableId={group.id} direction='vertical' type='card'>
            {(provided) => (
                <ul className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index} type='card'>
                            {(provided) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <CardPreview
                                        card={card}
                                        cardMembers={board.members.filter(member => card.memberIds.includes(member.id))}
                                        cardLabels={board.labels.filter(label => card.labelIds.includes(label.id))}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
        // </DragDropHandler>
    )
}