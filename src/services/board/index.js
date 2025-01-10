const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'


function getRamdonBoards(){
    let boards = []
    for(var i = 0 ; i < 2 ; i++){
        var board = getEmptyBoard()
        board._id = `board_${makeId()}`
          board.title = `Board ${i + 1}`
          boards.push(board)
    }
    return boards
}

function getEmptyBoard() {
	return {
		title: '',
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

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = {getRamdonBoards, getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
