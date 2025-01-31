import { useSearchParams } from 'react-router-dom'
import { Close, Members } from '../SvgContainer'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'

export function CardFilterModal({ onClose, board, filterMenuPosition, setFilterCount }) {
  const { labels, members } = board
  // const [searchParams, setSearchParams] = useSearchParams()
  // const [searchQuery, setSearchQuery] = useState(searchParams.get('filter') || '')
  // const [filteredBoards, setFilteredBoards] = useState([])

  // useEffect(() => {
  //   async function fetchFilteredBoards() {
  //     const {count, boards} = await boardService.query({txt: searchQuery})
  //     setFilteredBoards(boards)
  //     setFilterCount(count)
  //   }

  //   fetchFilteredBoards()

  //   if (searchQuery) {
  //     searchParams.set('filter', searchQuery)
  //   } else {
  //     searchParams.delete('filter')
  //   }
  //   setSearchParams(searchParams)
  // }, [searchQuery, setSearchParams])
  return (
    <section className="filter-modal"
      style={{
        position: "absolute",
        top: filterMenuPosition?.top || 0,
        left: filterMenuPosition?.left || 0,
      }}>
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
          <input
            className="search-by-name"
            type="text"
            placeholder="Enter a keyword..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="filter-op-desc">Search cards, members, labels, and more.</p>

        <div className="filter-section-members-filter">
          <p className='members-title'>Members</p>
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
              <label className="member">
                <input type="checkbox" />
                Cards assigned to me
              </label>
            </li>
            <li>
              <label className='members-select-container'>
                <select className='members-select-container'>
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

        <div className="filter-section-labels-filter">
          <p>Labels</p>
          <ul>
            {labels?.length ? (
              labels.map((label) => (
                <li key={label.id}>
                  <label>
                    <input type="checkbox" value={label.id} />
                    <span className="checkbox-icon icon"></span>
                    <span className="label-color" style={{ background: label.color }}></span>
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
      {/* {filteredBoards.length === 0  &&
          <div className="no-results">
            <img src="https://trello.com/assets/d2a0b151afa14cbf5147.svg" alt="No results found" />
            <p>Nothing found</p>
            <p>Try another search.</p>
          </div>
        } */}
    </section>
  )
}
