import {storageService} from '../async-storage.service'
import {saveToStorage, loadFromStorage} from '../util.service'
import {makeId} from '../util.service'
import {userService} from '../user'

const STORAGE_KEY = 'boardDB'
_createBoards()

export const boardService = {
  query,
  getById,
  saveBoard,
  remove,
  addBoardMsg,
  saveCard,
  getCardById,
  getGroup,
  getFilterdBoard,
}
window.cs = boardService

async function query() {
  var boards = await storageService.query(STORAGE_KEY)
  return boards
}

function getFilterdBoard(board, filterBy = {txt: ''}) {
  let filteredBoard = JSON.parse(JSON.stringify(board))
  const loggedInUser = userService.getLoggedinUser()

  if (!filteredBoard || !filteredBoard.groups) {
    return null
  }

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')

    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => regex.test(card.title))
      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups ,totalFilteredCards}
  }

  if (filterBy.noMembers) {
    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => card.memberIds.length === 0)

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)

    return {...filteredBoard, groups: filteredGroups ,totalFilteredCards}
  }

  if (filterBy.loggedInUser) {
    const userId = loggedInUser._id

    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => card.memberIds.find((memberId) => memberId === userId))

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups,totalFilteredCards}
  }

  if (filterBy.memberIds && filterBy.memberIds.length > 0) {
    const memberIds = filterBy.memberIds

    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => card.memberIds.find((id) => memberIds.includes(id)))

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups,totalFilteredCards}
  }

  if (filterBy.labelIds && filterBy.labelIds.length > 0) {
    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => {
        return card.labelIds.some((labelId) => filterBy.labelIds.includes(labelId))
      })

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups,totalFilteredCards}
  }

  if (filterBy.noLabels) {
    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => card.labelIds.length === 0)

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups,totalFilteredCards}
  }

  if (filterBy.labelIds && filterBy.labelIds.length > 0) {
    const filteredGroups = filteredBoard.groups.map((group) => {
      const filteredCards = group.cards.filter((card) => {
        return card.labelIds.some((labelId) => filterBy.labelIds.includes(labelId))
      })

      return {...group, cards: filteredCards}
    })
    const totalFilteredCards = countFilteredCards(filteredGroups)
    return {...filteredBoard, groups: filteredGroups,totalFilteredCards}
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
      title: board.title,
      workspace: board.workspace,
      isStarred: board.isStarred,
      archivedAt: board.archivedAt,
      createdBy: board.createdBy,
      style: {backgroundImage: board.style.backgroundImage},
      labels: board.labels,
      members: board.members,
      groups: board.groups,
      description: board.description,
    }
    savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
  } else {
    const boardToSave = {
      _id: makeId(),
      title: board.title,
      workspace: board.workspace,
      isStarred: board.isStarred || false,
      archivedAt: board.archivedAt,
      createdBy: userService.getLoggedinUser(),
      style: {backgroundImage: board.style.backgroundImage},
      labels: board.labels || [],
      members: board.members || [],
      groups: board.groups || [],
      description: board.description || '',
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
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function saveCard(boardId, groupId, card, activity) {
  const board = getById(boardId)
  const group = board.groups.find((group) => group.id === groupId)

  // PUT /api/board/b123/task/t678

  // TODO: find the task, and update
  const cardToUpdate = group.cards.find((cardToUpdate) => cardToUpdate.id)

  // board.activities.unshift(activity)
  saveBoard(board)
  // return board
  // return task
}

function getCardById(board, cardId) {
  if (!board.groups || board.groups.length === 0) return 'No cards available'

  for (let i = 0; i < board.groups.length; i++) {
    const card = _getCardInGroup(board.groups[i], cardId)
    if (card) return card
  }

  return new Error('Cannot find card: ', cardId)
}

function _getCardInGroup(group, cardId) {
  const card = group.cards.find((card) => card.id === cardId)

  if (!card) return
  return card
}

function getGroup(board, cardId) {
  if (!board.groups || board.groups.length === 0) return 'No cards available'

  for (let i = 0; i < board.groups.length - 1; i++) {
    const group = _getGroupByCard(board.groups[i], cardId)
    if (group) {
      return group
    }
  }

  return new Error('Cannot find group ')
}

function _getGroupByCard(group, cardId) {
  const card = group.cards.find((card) => card.id === cardId)
  if (!card) return
  return group
}

// for DEV

async function _createBoards() {
  let boards = loadFromStorage(STORAGE_KEY)
  const users = await userService.getUsers()

  if (!boards || !boards.length) {
    boards = [
      _createBoard('DoNotello - DEMO', users, '/imgs/board7.jpg'),
      // _createBoard('2'),
      // _createBoard('3'),
      // _createBoard('4'),
      // _createBoard('5'),
      // _createBoard('6'),
    ]
    saveToStorage(STORAGE_KEY, boards)
  }
}

function _createBoard(title, users, backgroundImageUrl) {
  const board = _getEmptyBoard(title)
  board._id = makeId()
  board.members = users
  board.style.backgroundImage = backgroundImageUrl
  board.labels = [
    {
      id: 'l101',
      title: 'Feature',
      color: '#533f03',
    },
    {
      id: 'l102',
      title: 'Bug',
      color: '#e1b205',
    },
    {
      id: 'l103',
      title: 'Refactor',
      color: '#a64700',
    },
    {
      id: 'l104',
      title: 'Important',
      color: '#ae2e24',
    },
    {
      id: 'l105',
      title: 'SOS',
      color: '#f87168',
    },
    {
      id: 'l106',
      title: 'Ideas',
      color: '#0055cc',
    },
    {
      id: 'l107',
      title: 'Not urgent',
      color: '#4d6b1f',
    },
    {
      id: 'l108',
      title: 'Design',
      color: '#50253f',
    },
  ]
  board.groups = [
    _createGroup('Backlog-server', [
      _createCard('Set up server', ['C101', 'S101', 'K101', 'B101']),
      _createCard('Add npm libs', ['S101', 'K101']),
      _createCard('Authentication', ['S101']),
      _createCard('Data validation'),
      _createCard('Services'),
      _createCard('Sockets', [], ['l101', 'l102', 'l103', 'l104', 'l105', 'l106', 'l107', 'l108']),
    ]),
    _createGroup('Backlog-client', [
      _createCard('Add card details', ['C101']),
      _createCard('Icons'),
      _createCard('Implement Sass', ['C101', 'S101', 'K101', 'B101']),
    ]),
    _createGroup('In development', [_createCard('API'), _createCard('Members', ['C101', 'S101'])]),
    _createGroup('Done', [_createCard('Planning the cmps tree'), _createCard('Vars'), _createCard('snippet')]),
    _createGroup('QA', [
      _createCard('Unit testing'),
      _createCard('Code refactoring for performance'),
      _createCard('Build basic template'),
      _createCard('Check data'),
      _createCard('Check QA'),
    ]),
    _createGroup('Ready to production', [
      _createCard('BoardDetails'),
      _createCard('SideBar', ['C101'], ['l101'], 'this card is amazing'),
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
    style: {},
  }
}

function _createCard(title, memberIds = [], labelIds = [], description = '') {
  return {
    id: makeId(),
    title,
    memberIds,
    labelIds,
    description,
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
      backgroundImage: '',
    },
    labels: [],
    members: [],
    groups: [],
    activities: [],
  }
}
