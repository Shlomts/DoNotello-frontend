import {boardService} from '../../services/board'
import {store} from '../store'
import {makeId} from '../../services/util.service'
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARDS,
  SET_BOARD,
  UPDATE_BOARD,
  ADD_BOARD_MSG,
  TOGGLE_BOARD_STAR,
} from '../reducers/board.reducer'

export async function loadBoards() {
  console.log('hi');
  
  try {
    const boards = await boardService.query()
    console.log("Loaded boards:", boards)    
    store.dispatch(getCmdSetBoards(boards))
  } catch (err) {
    console.log('Cannot load boards', err)
    throw err
  }
}

export async function loadBoard(boardId) {
  try {
    const board = await boardService.getById(boardId)
    store.dispatch(getCmdSetBoard(board))
  } catch (err) {
    console.log('Cannot load board', err)
    throw err
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch(getCmdRemoveBoard(boardId))
  } catch (err) {
    console.log('Cannot remove board', err)
    throw err
  }
}

export async function addBoard(board) {
  try {
    console.log('Adding board:', board);

    const savedBoard = await boardService.saveBoard(board)
    console.log('Saved board:', savedBoard);

    store.dispatch(getCmdAddBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot add board', err)
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
  console.log(board)
  console.log(group)
  console.log(cardToSave)

    group.cards.push(cardToSave)

    try {
        await updateBoard(board)
    } catch (err) {
        console.log("Cannot add card", err)
        console.error(err)
        throw err
    }
}

export async function updateCard(board, group, cardToSave) {
    const cardToCut = group.cards.findIndex(currCard => cardToSave.id === currCard.id) 
    group.cards.splice(cardToCut, 1,cardToSave)

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
        return card
    } catch (err) {
        console.log("Cannot load card", err)
        throw err
    }
}

export async function loadGroup(board, cardId) {
    try {
        const group = await boardService.getGroup(board, cardId)
        // store.dispatch(getCmdSetBoard(board))
        return group
    } catch (err) {
        console.log("Cannot load group", err)
        throw err
    }
}

export async function getGroupId(board, cardId) {
    try {
        const group = await boardService.getGroup(board, cardId)
        // store.dispatch(getCmdSetBoard(board))
        return group.id
    } catch (err) {
        console.log("Cannot load group", err)
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
    console.log(board)
    const group = board.groups.find(group => group.id === groupId)
    console.log("in remove group:", group)
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
    console.log('Cannot add board msg', err)
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

export async function toggleBoardStar(boardId) {
    try {
      // Get the current boards from the store
      const state = store.getState()
      const board = state.boardModule.boards.find((b) => b._id === boardId)
      if (!board) throw new Error('Board not found')
  
      // Toggle the isStarred property
      const updatedBoard = {...board, isStarred: !board.isStarred}
  
      // Update the board in the backend
      await boardService.saveBoard(updatedBoard)
      // console.log(updatedBoard , 'from toggle star')
  
      // Dispatch the action to update the board in the store
      store.dispatch({type: TOGGLE_BOARD_STAR, board: updatedBoard})
    } catch (err) {
      console.error('Failed to toggle board star:', err)
    }
  }

// unitTestActions()
async function unitTestActions() {
  await loadBoards()
  await addBoard(boardService.getEmptyBoard())
  await updateBoard({
    _id: 'm1oC7',
    title: 'Board-Good',
  })
  await removeBoard('m1oC7')
  // TODO unit test addBoardMsg
}
