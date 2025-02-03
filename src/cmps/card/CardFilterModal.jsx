import {useSearchParams} from 'react-router-dom'
import {Close, Labels, Members} from '../SvgContainer'
import Checkbox from '@mui/material/Checkbox'
import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {debounce} from '../../services/util.service'

export function CardFilterModal({onClose, board, filterMenuPosition, filterBy, onSetFilter}) {
  // const [searchParams, setSearchParams] = useSearchParams()

  const {labels, members, groups} = board
  const user = useSelector((storeState) => storeState.userModule.user)

  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  
  onSetFilter = useRef(debounce(onSetFilter))

  const cards = groups.flatMap((group) => group.cards)

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  // const [filterState, setFilterState] = useState({
  //   searchQuery: '',
  //   selectedLabels: [],
  //   selectedMembers: [],
  //   showNoLabels: false,
  //   showNoMembers: false,
  //   showOnlyMyCards: false,
  //   selectAllLabels: false,
  //   selectAllMembers: false,
  // })

  function handleChange({target}) {
    let {value, name: field, type} = target
    value = type === 'number' ? +value : value
    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  return (
    <section
      className="filter-modal"
      style={{
        position: 'absolute',
        top: filterMenuPosition?.top || 0,
        left: filterMenuPosition?.left || 0,
      }}
    >
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
            className="search-by-txt"
            type="text"
             name="txt"
            placeholder="Enter a keyword..."
            value={filterByToEdit.txt}
            onChange={handleChange}
          />
        </div>
        <p className="filter-op-desc">Search cards, members, labels, and more.</p>

        <div className="filter-section-members-filter">
          <p className="members-title">Members</p>
          <ul>
            <li>
              <label className="checkbox-label">
                <input className="checkbox" type="checkbox" />
                <span className="chackbox-icon icon">
                  <Checkbox
                    inputProps={{'aria-label': 'No members'}}
                    sx={{
                      color: '#738496',
                      padding: '12px',
                      width: '16px',
                      height: '16px',
                      '&.Mui-checked': {color: '#579dff'},
                    }}
                  />
                </span>
                <span className="member-input-container">
                  <div className="member-input-field">
                    <div className="members-icon-container">
                      <div className="icon-container">
                        <span className="member-icon icon">
                          <Members />
                        </span>
                      </div>
                    </div>
                    <div className="member-info">No members</div>
                  </div>
                </span>
              </label>
            </li>
            <li>
              <label className="loggedin-member">
                <input className="checkbox" type="checkbox" />
                <span className="chackbox-icon icon">
                  <Checkbox
                    inputProps={{'aria-label': 'controlled'}}
                    sx={{
                      color: '#738496',
                      padding: '12px',
                      width: '16px',
                      height: '16px',
                      '&.Mui-checked': {
                        color: '#579dff',
                      },
                    }}
                  />
                </span>
                <span className="member-input-container">
                  <div className="member-input-field">
                    <div className="members-icon-container">
                      <div className="user-img-container">
                        {user ? (
                          <img
                            src={user.imgUrl}
                            alt={user.fullname}
                            style={{width: '24px', height: '24px', borderRadius: '50%'}}
                          />
                        ) : (
                          <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ccc'}} />
                        )}
                      </div>
                    </div>
                    <div className="member-info">Cards assigned to me</div>
                  </div>
                </span>
              </label>
            </li>
            <li className="member-group">
              {/* Select All Members Checkbox */}

              <Checkbox
                inputProps={{'aria-label': 'Select all members'}}
                sx={{
                  color: '#738496',
                  padding: '12px',
                  width: '16px',
                  height: '16px',
                  '&.Mui-checked': {color: '#579dff'},
                }}
              />

              {/* Members Dropdown */}
              <select className="member-select">
                {/* Map through members and show in the dropdown */}
                {members?.map((member) => (
                  <option key={member.id} value={member.id}>
                    {/* <img
                        src={member.imgUrl}
                        alt={member.fullname}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          marginRight: '8px',
                        }}
                      /> */}
                    {member.fullname}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>

        <div className="filter-section-labels-filter">
          <p>Labels</p>
          <ul>
            {/* "No labels" Option */}
            <li>
              <label className="checkbox-label">
                <span className="chackbox-icon icon">
                  <Checkbox
                    inputProps={{'aria-label': 'No labels'}}
                    sx={{
                      color: '#738496',
                      padding: '12px',
                      width: '16px',
                      height: '16px',
                      '&.Mui-checked': {color: '#579dff'},
                    }}
                  />
                </span>
                <span className="labels-input-container">
                  <div className="labels-input-field">
                    <div className="labels-icon-container">
                      <div className="icon-container">
                        <span className="labels-icon icon">
                          <Labels />
                        </span>
                      </div>
                    </div>
                    <div className="labels-info">No labels</div>
                  </div>
                </span>
              </label>
            </li>

            {labels?.slice(0, 3).map((label) => (
              <li key={label.id}>
                <label className="checkbox-label">
                  <span className="chackbox-icon icon">
                    <Checkbox
                      inputProps={{'aria-label': label.title}}
                      sx={{
                        color: '#738496',
                        padding: '12px',
                        width: '16px',
                        height: '16px',
                        '&.Mui-checked': {color: '#579dff'},
                      }}
                    />
                  </span>
                  <span className="labels-input-container">
                    <div className="labels-input-field">
                      <span
                        className="label-color"
                        style={{
                          backgroundColor: label.color,
                          width: '100%',
                          height: '32px',
                          marginRight: '8px',
                        }}
                      >
                        {label.title}
                      </span>
                    </div>
                  </span>
                </label>
              </li>
            ))}

            {/* Select All Checkbox + Dropdown at the Bottom */}
            <li className="label-group">
              <Checkbox
                inputProps={{'aria-label': 'Select all labels'}}
                sx={{
                  color: '#738496',
                  padding: '12px',
                  width: '16px',
                  height: '16px',
                  '&.Mui-checked': {color: '#579dff'},
                }}
              />
              <select>
                {labels?.map((label) => (
                  <option key={label.id} value={label.id}>
                    <span
                      className="label-color"
                      style={{
                        backgroundColor: label.color,
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        marginRight: '8px',
                      }}
                    ></span>
                    {label.title}
                  </option>
                ))}
              </select>
            </li>
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
