import { DragDropContext } from "react-beautiful-dnd"
import { updateBoard } from "../store/actions/board.actions"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"

export function DragDropHandler({ children, board }) {

    async function handleDragEnd(result) {
        const { source, destination } = result
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        const newGroups = [...board.groups]

        if (source.droppableId === "group-list") {
            if (destination.droppableId !== "group-list") return

            const [removedGroup] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, removedGroup)

            try {
                await updateBoard({ ...board, groups: newGroups })
                showSuccessMsg("Group moved")
            } catch (err) {
                showErrorMsg("Move groups failed")
            }
            return
        }

        const sourceGroupIdx = newGroups.findIndex(group => group.id === source.droppableId)
        const destinationGroupIdx = newGroups.findIndex(group => group.id === destination.droppableId)

        if (sourceGroupIdx === -1 || destinationGroupIdx === -1) return

        const sourceGroup = { ...newGroups[sourceGroupIdx] }
        const sourceCards = [...sourceGroup.cards]
        const [removedCard] = sourceCards.splice(source.index, 1)

        if (sourceGroupIdx === destinationGroupIdx) {

            sourceCards.splice(destination.index, 0, removedCard)
            newGroups[sourceGroupIdx].cards = sourceCards

        } else {

            const destinationGroup = { ...newGroups[destinationGroupIdx] }
            const destinationCards = [...destinationGroup.cards]

            destinationCards.splice(destination.index, 0, removedCard)

            newGroups[sourceGroupIdx].cards = sourceCards
            newGroups[destinationGroupIdx].cards = destinationCards
        }

        try {
            await updateBoard({ ...board, groups: newGroups })
            showSuccessMsg("Card moved")
        } catch (err) {
            showErrorMsg("Card move failed")
        }
    }

    return <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
}