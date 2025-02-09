const { DEV, VITE_LOCAL } = import.meta.env

import { Description } from '../../cmps/SvgContainer'
import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

// function getRamdonBoards() {
//     let boards = []
//     for (var i = 0; i < 2; i++) {
//         var board = getEmptyBoard()
//         board._id = `board_${makeId()}`
//         board.title = `Board ${i + 1}`
//         boards.push(board)
//     }
//     return boards
// }

function getEmptyBoard() {
  return {
    title: '',
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

function getEmptyGroup() {
  return {
    id: makeId(),
    title: '',
    cards: [],
  }
}

function getEmptyCard() {
  return {
    id: makeId(),
    title: '',
    status: '',
    priority: '',
    dates: '',
    isDone: false,
    description: '',
    activity: [],
    checklists: [],
    memberIds: [],
    labelIds: [],
    byMember: {},
    style: {
      backgroundColor: '',
    },
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    memberIds: [],
    labelIds: [],
    loggedInUser: false,
    noMembers: false,
    noLabels: false,
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getEmptyGroup, getEmptyCard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
