// import { CardPreview } from './CardPreview'
// import { DragDropHandler } from '../DragDropHandler'
// import { Droppable, Draggable } from 'react-beautiful-dnd'

// export function CardList({ board }) {
//     if (!board.groups || board.groups.length === 0) return null

//     return (
//         <DragDropHandler board={board}>
//             {board.groups.map(group => (
//                 <Droppable droppableId={group.id} key={group.id}>
//                     {(provided) => (
//                         <ul className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
//                             {group.cards.map((card, index) => (
//                                 <Draggable key={card.id} draggableId={card.id} index={index}>
//                                     {(provided) => (
//                                         < li
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             ref={provided.innerRef}
//                                         >
//                                             <CardPreview
//                                                 card={card}
//                                                 board={board}
//                                             />
//                                         </li>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </ul>
//                     )}
//                 </Droppable>
//             ))}
//         </DragDropHandler >
//     )
// }

import { CardPreview } from './CardPreview'
import { DragDropHandler } from '../DragDropHandler'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export function CardList({ cards, board, group }) {
    if (!cards || cards.length === 0) return null

    return (
        <DragDropHandler board={board}>
            <Droppable droppableId={group.id}>
                {(provided) => (
                    <ul className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
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
        </DragDropHandler>
    )
}