import { boardService } from "../../services/board"
import { store } from "../store"
import { makeId } from "../../services/util.service"
import {
    ADD_BOARD,
    REMOVE_BOARD,
    SET_BOARDS,
    SET_BOARD,
    UPDATE_BOARD,
    ADD_BOARD_MSG,
} from "../reducers/board.reducer"

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log("Cannot load boards", err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log("Cannot load board", err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log("Cannot remove board", err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log("Cannot add board", err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.saveBoard(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log("Cannot update board", err)
        throw err
    }
}

export async function addGroupToBoard(board, groupToSave) {
    board.groups.push(groupToSave)

    try {
        await updateBoard(board)
    } catch (err) {
        console.log("Cannot add group", err)
        throw err
    }
}

export async function addCardToGroup(board, group, cardToSave) {
    group.cards.push(cardToSave)

    try {
        await updateBoard(board)
    } catch (err) {
        console.log("Cannot add card", err)
        throw err
    }
}


export async function loadCard(board, cardId) {
    try {
        const card = await boardService.getCardById(board, cardId)
        // store.dispatch(getCmdSetBoard(board))
        console.log("card in loadCard", card)
        return card
    } catch (err) {
        console.log("Cannot load card", err)
        throw err
    }
}

export async function removeGroupFromBoard(board, groupId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    if (groupIdx === -1) throw new Error('Group not found')

    board.groups.splice(groupIdx, 1)

    try {
        await updateBoard(board)
    } catch (err) {
        console.log("Cannot remove group", err)
        throw err
    }
}

export async function removeCardFromGroup(board, groupId, cardId) {
    const group = board.groups.find(group => group.id === groupId)
    if (!group) throw new Error('Group not found')

    const cardIdx = group.cards.findIndex(card => card.id === cardId)
    if (cardIdx === -1) throw new Error('Card not found')

    group.cards.splice(cardIdx, 1)

    try {
        await updateBoard(board)
    } catch (err) {
        console.log("Cannot remove card", err)
        throw err
    }
}


export async function addBoardMsg(boardId, txt) {
    try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        store.dispatch(getCmdAddBoardMsg(msg))
        return msg
    } catch (err) {
        console.log("Cannot add board msg", err)
        throw err
    }
}

// Command Creators:
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards,
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board,
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId,
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board,
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board,
    }
}
function getCmdAddBoardMsg(msg) {
    return {
        type: ADD_BOARD_MSG,
        msg,
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: "m1oC7",
        title: "Board-Good",
    })
    await removeBoard("m1oC7")
    // TODO unit test addBoardMsg
}
