import { useState, useEffect } from 'react'
import { CardFilterIcon } from '../SvgContainer'
import { onToggleModal } from '../../store/actions/system.actions'
import { CardFilterModal } from './CardFilterModal'
import { useSelector } from 'react-redux'
import {getPopupPosition} from '../../services/util.service'

export function CardFilter({ board }) {
  const modalData = useSelector((state) => state.systemModule.modalData)
  const isActive = modalData && modalData.cmp === CardFilterModal
  const filterdCards = false
  const [filterCount, setFilterCount] = useState(20)


  function toggleFilterModal(event) {
    const filterMenuPosition = getPopupPosition(event.currentTarget)

    onToggleModal(
      {
        cmp: CardFilterModal, // The modal component
        props: {
          onClose: () => onToggleModal(null),
          board,
          setFilterCount,
          filterMenuPosition
        },
        trigger: 'card-filter',
      },
      event
    )
  }

  return (
    <>
      <span className="filter-section">
        <button className={`card-filter-popover ${isActive ? 'active' : ''}`} onClick={toggleFilterModal}>
          <span className="filter-piramid icon">
            <CardFilterIcon />
          </span>
          <div className="btn-title">Filters</div>
          {filterdCards && (
            <>
              <div className="filter-popover-btn-count">
                <span className="counter">
                  {filterCount}
                  {/* here need to add the count of the results what change it do if there any filterd return the number here */}
                </span>
              </div>
              <button className="clear-all-btn" onClick={() => setFilterCount(0)}>Clear all</button>
            </>
          )}
        </button>
      </span>
      <span className="space"></span>
    </>
  )
}

// export function CardFilter() {
// const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))
// useEffect(() => {
//     setFilterBy(filterToEdit)
// }, [filterToEdit])

// function handleChange(ev) {
//     const type = ev.target.type
//     const field = ev.target.name
//     let value

//     switch (type) {
//         case 'text':
//         case 'radio':
//             value = field === 'sortDir' ? +ev.target.value : ev.target.value
//             if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
//             break
//         case 'number':
//             value = +ev.target.value || ''
//             break
//     }
//     setFilterToEdit({ ...filterToEdit, [field]: value })
// }

// function clearFilter() {
//     setFilterToEdit({ ...filterToEdit, txt: '', minSpeed: '', maxPrice: '' })
// }

// function clearSort() {
//     setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
// }
//     return <section className="card-filter">
//             <h3>Filter:</h3>
//             <input
//                 type="text"
//                 name="txt"
//                 value={filterToEdit.txt}
//                 placeholder="Free text"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="number"
//                 min="0"
//                 name="minSpeed"
//                 value={filterToEdit.minSpeed}
//                 placeholder="min. speed"
//                 onChange={handleChange}
//                 required
//             />
//             <button
//                 className="btn-clear"
//                 onClick={clearFilter}>Clear</button>
//             <h3>Sort:</h3>
//             <div className="sort-field">
//                 <label>
//                     <span>Speed</span>
//                     <input
//                         type="radio"
//                         name="sortField"
//                         value="speed"
//                         checked={filterToEdit.sortField === 'speed'}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label>
//                     <span>Vendor</span>
//                     <input
//                         type="radio"
//                         name="sortField"
//                         value="vendor"
//                         checked={filterToEdit.sortField === 'vendor'}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label>
//                     <span>Owner</span>
//                     <input
//                         type="radio"
//                         name="sortField"
//                         value="owner"
//                         checked={filterToEdit.sortField === 'owner'}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div className="sort-dir">
//                 <label>
//                     <span>Asce</span>
//                     <input
//                         type="radio"
//                         name="sortDir"
//                         value="1"
//                         checked={filterToEdit.sortDir === 1}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label>
//                     <span>Desc</span>
//                     <input
//                         type="radio"
//                         name="sortDir"
//                         value="-1"
//                         onChange={handleChange}
//                         checked={filterToEdit.sortDir === -1}
//                     />
//                 </label>
//             </div>
//             <button
//                 className="btn-clear"
//                 onClick={clearSort}>Clear</button>
//     </section>
// }
