import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { loadBoard, addBoardMsg } from "../store/actions/board.actions"
import { CardFilter } from "../cmps/card/CardFilter"
import { GroupList } from "../cmps/group/GroupList"
import { Plus, Close, Star, Unstar } from "../cmps/SvgContainer"

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const [isAddingGroup, setIsAddingGroup] = useState(false)

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function handleAddGroup() {
        isAddingGroup ? false : true
    }

    // useEffect(() => {
    //     loadBoards(filterBy)
    // }, [filterBy])

    if (!board) return <div>Loading...</div>

    return (
        <section className="board-details">

            <header>
                <section className="left-header">
                    <h3>{board.title}</h3>
                    <div className="isStarred">
                        {board.isStarred ?
                            <Unstar />
                            :
                            <Star />
                        }
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
                    {/* <span>board-edit</span> */}
                </section>

            </header>
            <main className="board-content">
                <GroupList
                    groups={board.groups}
                />
                <section className="add-group">
                    {isAddingGroup ? (

                        <div className="add-group-form">
                            <textarea
                                value=""
                                onChange=""
                                placeholder="Enter list name..."
                                rows={1}
                            />
                            <div className="add-group-actions">
                                <button className="save-group-btn">
                                    Add list
                                </button>
                                <button
                                    className="cancel-add-btn"
                                    onClick={() => setIsAddingGroup(false)}
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="add-group-btn"
                            onClick={() => setIsAddingGroup(true)}
                        >
                            <Plus />
                            Add another list
                        </button>
                    )}
                </section>
            </main>
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
