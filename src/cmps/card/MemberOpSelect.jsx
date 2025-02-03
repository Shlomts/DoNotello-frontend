import {Avatar, Checkbox} from '@mui/material'
import {useState} from 'react'
import { DownArrow } from '../SvgContainer'

export function MemeberOpSelect({members, onSelect}) {
  const [open, setOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])


  function handleSelect(member) {
    const isSelected = selectedMembers.includes(member._id)
    const newSelection = isSelected
      ? selectedMembers.filter((_id) => _id !== member._id)
      : [...selectedMembers, member._id]

    setSelectedMembers(newSelection)
    onSelect(newSelection)
  }

  return (
    <div className="custom-select">
      <div className="select-trigger" onClick={() => setOpen(!open)}>
        {selectedMembers.length > 0 ? `${selectedMembers.length} selected` : 'Select members'}

        <span className='icon'>
            <DownArrow/>
        </span>
      </div>

      {open && (
        <div className="dropdown">
          {members.map((member) => (
            <div key={member._id} className="dropdown-item" onClick={() => handleSelect(member)}>
              <Checkbox
                className="checkbox"
                checked={selectedMembers.includes(member._id)}
                sx={{
                  color: '#738496',
                  width: '16px',
                  height: '16px',
                  '&.Mui-checked': {color: '#579dff'},
                }}
              />
              <Avatar src={member.imgUrl} alt={member.fullname} className="avatar" />
              <div className="info">
                <span className="name">{member.fullname}</span>
                <span className="username">{member.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
