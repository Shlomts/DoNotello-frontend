import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    saveBoard,
    remove,
    addBoardMsg,
    getCardById,
    getGroup,
}

async function query(filterBy = {}) {
    return httpService.get(`board`, filterBy)
}

// async function query(filterBy = { txt: '', price: 0 }) {
//     return httpService.get(`board`, filterBy)
// }

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function saveBoard(board) {
    let savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
    return savedMsg
}

function getCardById(board, cardId) {
    if (!board.groups || board.groups.length === 0) return "No cards available"

    for (let i = 0; i < board.groups.length; i++) {
        const card = _getCardInGroup(board.groups[i], cardId)
        if (card) return card
    }

    return new Error("Cannot find card: ", cardId)
}

function _getCardInGroup(group, cardId) {
    const card = group.cards.find((card) => card.id === cardId)

    if (!card) return
    return card
}

function getGroup(board, cardId) {
    if (!board.groups || board.groups.length === 0) return "No cards available"

    for (let i = 0; i < board.groups.length - 1; i++) {
        const group = _getGroupByCard(board.groups[i], cardId)
        if (group) {
            return group
        }
    }

    return new Error("Cannot find group ")
}

function _getGroupByCard(group, cardId) {
    const card = group.cards.find((card) => card.id === cardId)
    if (!card) return
    return group
}