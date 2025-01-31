import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { DragDropHandler } from "../cmps/DragDropHandler"
import { SideBar } from "../cmps/SideBar"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import {
    loadBoard,
    loadBoards,
    addBoard,
    updateBoard,
    removeBoard,
    addBoardMsg,
    addGroupToBoard,
    removeGroupFromBoard
} from "../store/actions/board.actions"

import { loadUsers } from "../store/actions/user.actions"

import { CardFilter } from "../cmps/card/CardFilter"
import { GroupList } from "../cmps/group/GroupList"
import { BoardMembers } from "../cmps/member/BoardMembers"
import { Plus, Close, Star, Unstar, ListActionsIcon } from "../cmps/SvgContainer"
import { boardService } from "../services/board"
import { BoardMenu } from "../cmps/board/BoardMenu"

export function BoardDetails() {
    const { boardId } = useParams()

    const users = useSelector((storeState) => storeState.userModule.users)
    const board = useSelector((storeState) => storeState.boardModule.board)

    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())

    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const [groupName, setGroupName] = useState("")

    const [isEditingBoardName, setIsEditingBoardName] = useState(false)
    const [boardTitle, setBoardTitle] = useState(board?.title || '')

    const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false)

    useEffect(() => {
        loadBoard(boardId)
        loadUsers()
    }, [boardId])

    useEffect(() => {
        if (board && board.title !== boardTitle) {
            setBoardTitle(board.title)
        }
    }, [board])

    function onSetGroupName(ev) {
        const name = ev.target.value
        setGroupName(name)
    }

    function onSetBoardTitle(ev) {
        const newBoardTitle = ev.target.value
        setBoardTitle(newBoardTitle)
    }

    async function updateBoardName(boardTitle) {
        if (board.title === '') return

        try {
            const updatedBoard = { ...board, title: boardTitle }
            await updateBoard(updatedBoard)
            showSuccessMsg('Board updated')
            setIsEditingBoardName(false)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    async function onSetStar(board) {
        try {
            const updatedBoard = { ...board, isStarred: !board.isStarred }
            await updateBoard(updatedBoard)
            showSuccessMsg('Board updated')
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    async function onRemoveGroup(groupId) {
        try {
            await removeGroupFromBoard(board, groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            showErrorMsg('Cannot remove group')
        }
    }

    async function onAddGroup() {
        console.log('onaddgroup')
        const groupToSave = boardService.getEmptyGroup()
        if (groupName === '') return
        groupToSave.title = groupName


        try {
            await addGroupToBoard(board, groupToSave)
            showSuccessMsg(`Board updated, new group: ${groupToSave.title}`)
            setGroupName("")
        } catch (err) {
            console.error(err)
            showErrorMsg("Cannot add group")
        }
    }

    function onKeyDown(ev) {
        if (ev.key === 'Enter') {
            updateBoardName(ev.target.value)
        }
    }

    function toggleBoardMenu() {
        setIsBoardMenuOpen(prevState => !prevState)
    }

    if (!board) return <div>Loading...</div>

    return (
        <section className="board-page">
            <SideBar
                board={board}
                onSetStar={onSetStar}
            />
            <section className="board-details"
                style={{ backgroundImage: `url(${board.style.backgroundImage})` }}
            >
                <header>
                    <section className="left-header">
                        {isEditingBoardName ? (
                            <input
                                type="text"
                                value={boardTitle}
                                onChange={onSetBoardTitle}
                                onBlur={(ev) => updateBoardName(ev.target.value)}
                                onKeyDown={onKeyDown}
                                autoFocus
                            />
                        ) : (
                            <h3 onClick={() => setIsEditingBoardName(true)}>{boardTitle}</h3>
                        )}

                        <div className="isStarred"
                            onClick={() => onSetStar(board)}>
                            {board.isStarred ? <Unstar /> : <Star />}
                        </div>
                    </section>
                    <section className="right-header">
                        <CardFilter
                            board={board} />
                        <BoardMembers
                            members={board.members}
                        />
                        {!isBoardMenuOpen &&
                            <div className="board-actions-menu"
                                onClick={toggleBoardMenu}>
                                <ListActionsIcon />
                            </div>
                        }
                    </section>
                </header>

                <section className={`board-main ${isBoardMenuOpen ? 'menu-open' : ''}`}>
                    <main className="board-content">
                        <DragDropHandler board={board}>
                            <GroupList
                                board={board}
                                groups={board.groups}
                                onRemoveGroup={onRemoveGroup}
                            />
                        </DragDropHandler>
                        <section className="add-group">
                            {isAddingGroup ? (
                                <div className="add-group-form" >
                                    <textarea
                                        value={groupName}
                                        onChange={onSetGroupName}
                                        placeholder="Enter list name..."
                                        rows={1}
                                        autoFocus
                                        onKeyDown={ev => {
                                            if (ev.key === 'Enter') {
                                                ev.preventDefault()
                                                onAddGroup()
                                            }
                                        }}
                                    />
                                    <div className="add-group-actions">
                                        <button
                                            className="save-group-btn"
                                            onClick={() => {
                                                onAddGroup()
                                            }}
                                        >
                                            Add list
                                        </button>
                                        <button
                                            className="cancel-add-btn"
                                            onClick={() => {
                                                setIsAddingGroup(false)
                                                setGroupName("")
                                            }}
                                        >
                                            <Close />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="add-group-btn"
                                    onClick={() => {
                                        setIsAddingGroup(true)
                                    }}
                                >
                                    <Plus />
                                    Add another list
                                </button>
                            )}
                        </section>
                    </main>

                </section>
            </section>
            {isBoardMenuOpen &&
                <BoardMenu
                    board={board}
                    onClose={toggleBoardMenu}
                />
            }
        </section>
    )
}