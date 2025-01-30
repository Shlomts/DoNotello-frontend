import {Close, Members} from '../SvgContainer'

export function CardFilterModal({onClose, board}) {
  const {labels, members} = board
  return (
    <section className="filter-modal">
      <header className="modal-header">
        <h2>Filter</h2>
        <button className="close-btn" onClick={onClose}>
          <span className="close-btn-icon icon">
            <Close />
          </span>
        </button>
      </header>
      <div className="filter-modal-container">
        <p className="keyword">keyword</p>
        <div className="filter-section search-bar">
          <input type="text" placeholder="Enter a keyword..." />
        </div>
        <p class="filter-op-desc">Search cards, members, labels, and more.</p>

        <div className="filter-section members-filter">
          <p>Members</p>
          <ul>
            <li>
              <label>
                <input type="checkbox" value={console.log} onChange={console.log} />
                <span className="chackbox-icon icon"></span>
                <span>
                  <div className="input-field">
                    <div className="members-icon-container">
                      <span className="member-icon icon">
                        <Members />
                      </span>
                    </div>
                    <div className="member-info">No members</div>
                  </div>
                </span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Cards assigned to me
              </label>
            </li>
            <li>
              <label>
                <select>
                  <option value="">Select members</option>
                  {members?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          </ul>
        </div>

        <div className="filter-section labels-filter">
          <p>Labels</p>
          <ul>
            {labels?.length ? (
              labels.map((label) => (
                <li key={label.id}>
                  <label>
                    <input type="checkbox" value={label.id} />
                    <span className="checkbox-icon icon"></span>
                    <span className="label-color" style={{background: label.color}}></span>
                    {label.name}
                  </label>
                </li>
              ))
            ) : (
              <li>No labels available</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
