import { Fragment } from "react"
import { useNavigate } from "react-router"

export function CardDetails() {
    const navigate = useNavigate()

    return (
        <Fragment>
        <div className="backdrop">  </div>

        <dialog open className="card-details">
            <button
                onClick={(ev) => {
                    ev.preventDefault
                    navigate("/board/:boardId")
                }}
            >
                X
            </button>
            <div className="header icon">🖥️</div>
            <header className="header">
                <h3> I'm Card Details</h3>
                <p>
                    In list: <span>List Name</span>
                </p>
            </header>
            <section className="opt-bar">
                <ul>
                    <span>➕</span>
                    <li>Join</li>
                    <span>🙆</span>
                    <li>Members</li>
                    <span>🏷️</span>
                    <li>Labels</li>
                    <span>✅</span>
                    <li>Checklist</li>
                    <span>📅</span>
                    <li>Dates</li>
                    <span>📎</span>
                    <li>Attachment</li>
                    <span>📌</span>
                    <li>Location</li>
                    <span>✏️</span>
                    <li>Custom Fields</li>
                </ul>
            </section>
            <section className="notifications">
                Notifications
                <div className="notifications">
                    <span className="btn icon">👁️</span>
                    <span className="btn txt">Watch</span>
                </div>
            </section>
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

            <div className="description icon">📒</div>
            <section className="description">
                <h4 className="title">Description</h4>
                <div className="input">
                    <textarea type="text"></textarea>
                </div>
            </section>

            <div className="activity icon">📰</div>
            <section className="activity">
                <h4 className="title">Activity</h4>
                <span className="user avatar">😂</span>
                <div className="input">
                    <textarea
                        type="text"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button>Save</button>
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
                </div>
                <span className="avatar">😢</span>
                <div className="comments">NOOOOOO</div>
            </section>
        </dialog>
        </Fragment>
    )
}
