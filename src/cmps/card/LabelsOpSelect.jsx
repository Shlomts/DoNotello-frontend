import {useState} from 'react'
import {Checkbox} from '@mui/material'
import {DownArrow} from '../SvgContainer'

export function LabelsOpSelect({labels, onSelect, placeholder = 'Select labels'}) {
  const [open, setOpen] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState([])

  function handleSelect(label) {
    const isSelected = selectedLabels.includes(label.id)
    const newSelection = isSelected ? selectedLabels.filter((id) => id !== label.id) : [...selectedLabels, label.id]
    setSelectedLabels(newSelection)
    onSelect({target: {name: 'labelIds', value: newSelection}})
  }


  return (
    <div className="custom-select">
      <div className="select-trigger" onClick={() => setOpen(!open)}>
        {selectedLabels.length > 0 ? `${selectedLabels.length} selected` : placeholder}
        <span className="icon">
          <DownArrow />
        </span>
      </div>

      {open && (
        <ul className="dropdown ">
          {labels.map((label) => (
            <li key={label.id} className="dropdown-item labels-op">
              <label className="checkbox-label">
                <span className="checkbox-icon">
                  <Checkbox
                    checked={selectedLabels.includes(label.id)}
                    onChange={() => handleSelect(label)}
                    sx={{
                      color: '#738496',
                      '&.Mui-checked': {color: '#579dff'},
                    }}
                  />
                </span>
                <span className="labels-input-container-op">
                  <div className="labels-input-field">
                    <span className="label-color" style={{backgroundColor: label.color}}>
                      {label.title}
                    </span>
                  </div>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
