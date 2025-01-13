import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { useSelector } from "react-redux"

import { loadCard } from "../store/actions/board.actions"
import {
    Card,
    Description,
    Members,
    Labels,
    Checklist,
    Dates,
    Close,
    Delete,
} from "../cmps/SvgContainer"

export function CardDetails() {
    const navigate = useNavigate()
    const [card, setCard] = useState(null)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const params = useParams()

    // const board = useSelector((storeState) => storeState.boardModule.board)

    const { boardId } = useParams()
    const { cardId } = useParams()
    // const [card, setCard] = useState(null)

    useEffect(() => {
        getCard()
    }, [params.cardId])

    async function getCard() {
            try {
                const cardToSave = await loadCard(board, cardId)
                setCard(cardToSave)
            } catch (err) {
                console.log("Having problmes loading card...", err)
                throw err
            }
    }
    // function getCard() {
    //     carService
    //         .get(params.cardId)
    //         .then(setCar)
    //         .catch((err) => {
    //             console.log("Problem getting car", err)
    //             showErrorMsg("Problem getting car")
    //             navigate("/car")
    //         })
    // }

    // useEffect(async () => {
    //     try {
    //         const cardToSave = await loadCard(boardId, cardId)
    //         setCard(cardToSave)
    //     } catch (err) {
    //         console.log("Having problmes loading card...", err)
    //         throw err
    //     }
    // }, [cardId])

    if (!card) return <div>Loading...</div>

    return (
        <Fragment>
            <div className="backdrop"> </div>

            <dialog open className="card-details">
                <button
                    onClick={(ev) => {
                        ev.preventDefault
                        navigate(`/board/${boardId}`)
                    }}
                >
                    <Close />
                </button>
                <div className="header icon">
                    <Card />
                </div>
                <header className="header">
                    <h3> {card.title}</h3>
                    <div>
                        in list: <span>List Name</span>
                    </div>
                </header>
                <section className="opt-bar">
                    <ul>
                        {/* <li className="opt-card">
                            <div>➕</div>
                            <div>Join</div>
                        </li> */}
                        <li className="opt-card">
                            <div className="icon">
                                <Members />
                            </div>
                            <div className="name">Members</div>
                        </li>
                        <li className="opt-card">
                            <div className="icon">
                                <Labels />
                            </div>
                            <div className="name">Labels</div>
                        </li>
                        <li className="opt-card">
                            <div className="icon">
                                <Checklist />
                            </div>
                            <div className="name">Checklist</div>
                        </li>
                        <li className="opt-card">
                            <div className="icon">
                                <Dates />
                            </div>
                            <div className="name">Dates</div>
                        </li>
                        {/* <li className="opt-card">
                            <div>📎</div>
                            <div>Attachment</div>
                        </li>
                        <li className="opt-card">
                            <div>📌</div>
                            <div>Location</div>
                        </li> */}
                    </ul>
                </section>
                <div className="user-opt">
                    {/* <section className="notifications">
                        Notifications
                        <div className="notifications">
                            <form>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isWatch"
                                        value="false"
                                    />
                                    Watch{" "}
                                </label>
                            </form>
                            <span className="btn icon">👁️</span>
                            <span className="btn txt">Watch</span>
                        </div>
                    </section> */}
                    <section>
                        Members
                        <div className="members">
                            <span className="btn avatar">😁</span>
                            <span className="btn txt">+</span>
                        </div>
                    </section>
                    <section className="labels">
                        <h4>Labels</h4>

                        <div className="labels">
                            <span className="btn avatar">label</span>
                            <span className="btn txt">+</span>
                        </div>
                    </section>
                </div>

                <div className="description icon">
                    <Description />
                </div>
                <section className="description">
                    <h4 className="title">Description</h4>
                    <div className="input">
                        <textarea type="text"></textarea>
                    </div>
                </section>

                {/* <div className="activity icon">📰</div>
                <section className="activity">
                    <h4 className="title">Activity</h4>
                </section>

                <span className="user avatar">😂</span>
                <div className="input">
                    <textarea
                        type="text"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button>Save</button>
                </div>
                <span className="avatar">😢</span>
                <div className="comments">NOOOOOO</div> */}
            </dialog>
        </Fragment>
    )
}
