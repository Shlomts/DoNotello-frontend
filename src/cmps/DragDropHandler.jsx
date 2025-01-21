import { DragDropContext } from "react-beautiful-dnd";
import { updateBoard } from "../store/actions/board.actions";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";

export function DragDropHandler({ children, board }) {

    async function moveGroup(source, destination, newGroups) {
        const [removedGroup] = newGroups.splice(source.index, 1)
        newGroups.splice(destination.index, 0, removedGroup)

        try {
            await updateBoard({ ...board, groups: newGroups })
            showSuccessMsg("Group moved")
        } catch (err) {
            showErrorMsg("Group cards failed")
        }
    }

    async function moveCardWithinGroup(source, destination, newGroups) {
        const sourceGroupIdx = newGroups.findIndex(group => group.id === source.droppableId);
        if (sourceGroupIdx === -1) return;

        const sourceGroup = { ...newGroups[sourceGroupIdx] };
        const sourceCards = [...sourceGroup.cards];

        const [removedCard] = sourceCards.splice(source.index, 1);
        sourceCards.splice(destination.index, 0, removedCard);

        newGroups[sourceGroupIdx].cards = sourceCards;

        try {
            await updateBoard({ ...board, groups: newGroups });
            showSuccessMsg("Card moved within the group");
        } catch (err) {
            showErrorMsg("Card move failed");
        }
    }

    async function moveCardBetweenGroups(source, destination, newGroups) {
        const sourceGroupIdx = newGroups.findIndex(group => group.id === source.droppableId);
        const destinationGroupIdx = newGroups.findIndex(group => group.id === destination.droppableId);

        if (sourceGroupIdx === -1 || destinationGroupIdx === -1) return;

        const sourceGroup = { ...newGroups[sourceGroupIdx] };
        const destinationGroup = { ...newGroups[destinationGroupIdx] };

        const sourceCards = [...sourceGroup.cards];
        const destinationCards = [...destinationGroup.cards];

        const [removedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, removedCard);

        newGroups[sourceGroupIdx].cards = sourceCards;
        newGroups[destinationGroupIdx].cards = destinationCards;

        try {
            await updateBoard({ ...board, groups: newGroups });
            showSuccessMsg("Card moved to another group");
        } catch (err) {
            showErrorMsg("Card move failed");
        }
    }

    function handleDragDrop(result) {
        const { source, destination } = result
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        const newGroups = [...board.groups]

        if (source.droppableId === "group-list" && destination.droppableId === "group-list") {
            moveGroup(source, destination, newGroups)
        }

        if (source.droppableId === destination.droppableId) {
            moveCardWithinGroup(source, destination, newGroups);
        } else {
            moveCardBetweenGroups(source, destination, newGroups);
        }

    }

    return <DragDropContext onDragEnd={handleDragDrop}>{children}</DragDropContext>

}