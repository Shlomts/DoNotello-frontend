import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { loadBoard, addBoardMsg } from "../store/actions/board.actions"
import { CardFilter } from "../cmps/card/CardFilter"
import { GroupList } from "../cmps/group/GroupList"

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    // useEffect(() => {
    //     loadBoards(filterBy)
    // }, [filterBy])

    if (!board) return <div>Loading...</div>

    return (
        <section className="board-details">
            <div className="header">
                <section className="board-data">
                    <h1>{board.title}</h1>
                </section>
                <section className="board-edit">
                    <span>board-edit</span>
                </section>
            </div>
            <div className="board-content">
                <GroupList
                    groups={board.groups}
                />
                <button className="add-group">+ Add another list</button>
            </div>
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
