import { Description, Checklist } from "../../SvgContainer"

export function CardIcons({ card }) {
    const hasDescription = card.description

    let totalTasks = 0
    let totalDoneTasks = 0

    card.checklists.forEach(checklist => {
        checklist.tasks.forEach(task => {
            totalTasks++
            if (task.isDone) totalDoneTasks++
        })
    })

    const hasChecklists = totalTasks > 0
    if (!hasDescription && !hasChecklists) return null

    return (
        <div className="card-icons">
            {hasDescription &&
                (<span className="icon-description"><Description /></span>)}
            {hasChecklists &&
                (<span className="icon-checklist"><Checklist />
                    <span className="checklist-progress">
                        {totalDoneTasks}/{totalTasks}
                    </span>
                </span>
                )}
        </div>
    )
}