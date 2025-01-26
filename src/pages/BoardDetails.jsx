import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import demoBG from "../../public/imgs/demoBG.jpg"
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
import { Plus, Close, Star, Unstar } from "../cmps/SvgContainer"
import { boardService } from "../services/board"

export function BoardDetails() {
    const { boardId } = useParams()
    const users = useSelector((storeState) => storeState.userModule.users)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [isEditingBoardName, setIsEditingBoardName] = useState(false)
    const [boardTitle, setBoardTitle] = useState(board?.title || '')

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

    if (!board) return <div>Loading...</div>

    return (
        <section className="board-page">
            <SideBar
                board={board}
                onSetStar={onSetStar}
            />
            <section className="board-details"
                style={{ backgroundImage: `url(${demoBG})` }}
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
                        {/* <div className="change-icon">
                        change
                    </div>
                    <div className="table-icon">
                        table
                    </div>
                    <div className="customize-icon">
                        customize
                    </div> */}
                    </section>
                    <section className="right-header">
                        <BoardMembers
                            members={board.members}
                        />
                    </section>
                </header>
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
    )
}

// export function BoardDetails() {
//     const { boardId } = useParams()
//     const board = useSelector((storeState) => storeState.boardModule.board)
//     const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())

//     useEffect(() => {
//         loadBoard(boardId)
//     }, [boardId])

//     // useEffect(() => {
//     //     loadBoards(filterBy)
//     // }, [filterBy])

//     async function onAddBoardMsg(boardId) {
//         try {
//             await addBoardMsg(
//                 boardId,
//                 "bla bla " + parseInt(Math.random() * 10)
//             )
//             showSuccessMsg(`Board msg added`)
//         } catch (err) {
//             showErrorMsg("Cannot add board msg")
//         }
//     }

//     return (
//         <section className="board-details">
//             <CardFilter filterBy={filterBy} setFilterBy={setFilterBy} />
//             <GroupList />

//             <Link to="/board">Back to list</Link>
//             <h1>Board Details</h1>
//             {board && (
//                 <div>
//                     <h3>{board.vendor}</h3>
//                     <h4>${board.price}</h4>
//                     <pre> {JSON.stringify(board, null, 2)} </pre>
//                 </div>
//             )}
//             <button
//                 onClick={() => {
//                     onAddBoardMsg(board._id)
//                 }}
//             >
//                 Add board msg
//             </button>
//         </section>
//     )
// }
