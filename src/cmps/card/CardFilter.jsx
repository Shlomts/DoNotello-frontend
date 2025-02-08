import {useState, useEffect} from 'react'
import {CardFilterIcon} from '../SvgContainer'
import {onToggleModal} from '../../store/actions/system.actions'
import {CardFilterModal} from './CardFilterModal'
import {useSelector} from 'react-redux'
import {getPopupPosition} from '../../services/util.service'
import {boardService} from '../../services/board'

export function CardFilter({board, filterBy, onSetFilter}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalData = useSelector((state) => state.systemModule.modalData)
  const isActive = modalData && modalData.cmp === CardFilterModal
  const [filterCount, setFilterCount] = useState(0)

  useEffect(() => {
    if (board && filterBy) {
      const {totalFilteredCards} = boardService.getFilterdBoard(board, filterBy)
      setFilterCount(totalFilteredCards)
    }
  }, [board, filterBy])

  function onClose() {
    onToggleModal(null)
    setIsModalOpen(false)
  }

  function toggleFilterModal(event) {
    const filterMenuPosition = getPopupPosition(event.currentTarget)
    setIsModalOpen(!isModalOpen)
    if (!isModalOpen) {
      onToggleModal(
        {
          cmp: CardFilterModal,
          props: {
            onClose,
            board,
            filterBy,
            onSetFilter,
            filterMenuPosition,
          },
          trigger: 'card-filter',
        },
        event
      )
    } else {
      onToggleModal(null)
    }
  }

  function clearFilters(ev) {
    ev.stopPropagation()
    onSetFilter({})
    setFilterCount(0)
    onToggleModal(null)
    setIsModalOpen(false)
  }

  
  return (
    <>
      <span className="filter-section">
        <button className={`card-filter-popover ${isActive ? 'active' : ''}`} onClick={toggleFilterModal}>
          <span className="filter-piramid icon">
            <CardFilterIcon />
          </span>
          <div className="btn-title">Filters</div>
          {filterCount > 0 && (
            <>
              <div className="filter-popover-btn-count">
                <span className="counter">{filterCount}</span>
              </div>
              <button className="clear-all-btn" onClick={(ev) => clearFilters(ev)}>
                Clear all
              </button>
            </>
          )}
        </button>
      </span>
      <span className="space"></span>
    </>
  )
}
