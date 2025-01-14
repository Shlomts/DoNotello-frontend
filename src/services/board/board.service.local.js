
import { storageService } from '../async-storage.service'
import { saveToStorage, loadFromStorage } from '../util.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'boardDB'
_createBoards()


export const boardService = {
    query,
    getById,
    saveBoard,
    remove,
    addBoardMsg,
    saveCard,
}
window.cs = boardService


async function query() {
    return await storageService.get(STORAGE_KEY)
}

// async function query(filterBy = { txt: '', price: 0 }) {
//     var boards = await storageService.query(STORAGE_KEY)
//     const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

//     if (txt) {
//         const regex = new RegExp(filterBy.txt, 'i')
//         boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
//     }
//     if (minSpeed) {
//         boards = boards.filter(board => board.speed >= minSpeed)
//     }
//     if(sortField === 'vendor' || sortField === 'owner'){
//         boards.sort((board1, board2) => 
//             board1[sortField].localeCompare(board2[sortField]) * +sortDir)
//     }
//     if(sortField === 'price' || sortField === 'speed'){
//         boards.sort((board1, board2) => 
//             (board1[sortField] - board2[sortField]) * +sortDir)
//     }

//     boards = boards.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
//     return boards
// }

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function saveBoard(board) {
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
            title: board.boardTitle,
            workspace: board.workspace,
            isStarred: board.isStarred,
            archivedAt: board.archivedAt,
            createdBy: board.createdBy,
            style: board.backgroundUrl,
            labels: board.labels,
            members: board.members,
            groups: board.groups,
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            _id: makeId(),
            title: board.boardTitle,
            workspace: board.workspace,
            isStarred: board.isStarred,
            archivedAt: board.archivedAt,
            createdBy: userService.getLoggedinUser(),
            style: board.backgroundUrl,
            labels: board.labels || [],
            members: board.members || [],
            groups: board.groups || [],
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

function saveCard(boardId, groupId, card, activity) {
    const board = getById(boardId)
    const group = board.groups.find(group => group.id === groupId)

    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    const cardToUpdate = group.cards.find(cardToUpdate => cardToUpdate.id)

    // board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}

// for DEV 

async function _createBoards() {
    let boards = loadFromStorage(STORAGE_KEY)
    const users = await userService.getUsers()

    if (!boards || !boards.length) {
        boards = [
            _createBoard('DoNotello - DEMO', users),
            // _createBoard('2'),
            // _createBoard('3'),
            // _createBoard('4'),
            // _createBoard('5'),
            // _createBoard('6'),
        ]
        saveToStorage(STORAGE_KEY, boards)
    }
}

function _createBoard(title, users) {
    const board = _getEmptyBoard(title)
    board._id = makeId()
    board.members = users
    board.groups = [
        _createGroup('Backlog-server'),
        _createGroup('Backlog-client',
            [
                _createCard('Add task details')
            ]),
        _createGroup('In development',
            [
                _createCard('API'),
                _createCard('demo', 'C101')
            ]),
        _createGroup('Done',
            [
                _createCard('Planning the cmps tree'),
                _createCard('Vars'),
                _createCard('snippet'),
            ]),
        _createGroup('QA',
            [
                _createCard('Two'),
                _createCard('Cards')
            ]),
        _createGroup('Ready to production',
            [
                _createCard('Two'),
                _createCard('Cards')
            ]),
    ]
    return board
}

function _createGroup(title, cards = [], isStarred = false) {
    return {
        id: makeId(),
        title,
        cards,
        isStarred,
        style: {}
    }
}

function _createCard(title, memberIds = []) {
    return {
        id: makeId(),
        title,
        memberIds,
    }
}

function _getEmptyBoard(title) {
    return {
        title,
        workspace: 1,
        isStarred: false,
        archivedAt: null,
        createdBy: {},
        style: {
            backgroundImage: ""
        },
        labels: [],
        members: [],
        groups: [],
        activities: []
    }
}