import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    saveBoard,
    remove,
    addBoardMsg,
    getCardById,
    getGroup,
    getFilterdBoard,
}

async function query(filterBy = {}) {
    return httpService.get(`board`, filterBy)
}

// async function query(filterBy = { txt: '', price: 0 }) {
//     return httpService.get(`board`, filterBy)
// }

function getFilterdBoard(board, filterBy = { txt: '' }) {
    let filteredBoard = JSON.parse(JSON.stringify(board))
    const loggedInUser = userService.getLoggedinUser()

    if (!filteredBoard || !filteredBoard.groups) {
        return null
    }

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')

        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => regex.test(card.title))
            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups }
    }

    if (filterBy.noMembers) {
        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => card.memberIds.length === 0)

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)

        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    if (filterBy.loggedInUser) {
        console.log(filteredBoard)
        const userId = loggedInUser._id
        console.log(userId)

        const filteredGroups = filteredBoard.groups.map((group) => {
            console.log(group.cards)
            const filteredCards = group.cards.filter((card) => card.memberIds.find((memberId) => memberId === userId))

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    if (filterBy.memberIds && filterBy.memberIds.length > 0) {
        const memberIds = filterBy.memberIds

        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => card.memberIds.find((id) => memberIds.includes(id)))

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    if (filterBy.labelIds && filterBy.labelIds.length > 0) {
        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => {
                return card.labelIds.some((labelId) => filterBy.labelIds.includes(labelId))
            })

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    if (filterBy.noLabels) {
        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => card.labelIds.length === 0)

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    if (filterBy.labelIds && filterBy.labelIds.length > 0) {
        const filteredGroups = filteredBoard.groups.map((group) => {
            const filteredCards = group.cards.filter((card) => {
                return card.labelIds.some((labelId) => filterBy.labelIds.includes(labelId))
            })

            return { ...group, cards: filteredCards }
        })
        const totalFilteredCards = countFilteredCards(filteredGroups)
        return { ...filteredBoard, groups: filteredGroups, totalFilteredCards }
    }

    return filteredBoard
}

function countFilteredCards(groups) {
    let totalCount = 0

    groups.forEach((group) => {
        totalCount += group.cards.length
    })

    return totalCount
}

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