import {Avatar, Checkbox} from '@mui/material'
import {useEffect, useState} from 'react'
import {DownArrow, SmallDownArrow} from '../SvgContainer'

export function MemeberOpSelect({members, selectedMemberIds, onSelect}) {
  const [open, setOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState(selectedMemberIds || [])

  useEffect(() => {
    setSelectedMembers(selectedMemberIds || [])
  }, [selectedMemberIds])

  function handleSelect(memberId) {
    const isSelected = selectedMembers.includes(memberId)
    const newSelection = isSelected ? selectedMembers.filter((id) => id !== memberId) : [...selectedMembers, memberId]

    setSelectedMembers(newSelection)
    onSelect({target: {name: 'memberIds', value: newSelection}})
  }

  return (
    <div className="custom-select">
      <div className={`select-trigger ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
        {selectedMembers.length > 0 ? `${selectedMembers.length} selected` : 'Select members'}

        <span className="icon">
          <SmallDownArrow />
        </span>
      </div>

      {open && (
        <div className="dropdown">
          {members.map((member) => (
            <div key={member._id} className="dropdown-item" onClick={() => handleSelect(member)}>
              <Checkbox
                className="checkbox-icon"
                value={member.id}
                checked={selectedMembers.includes(member._id)}
                onChange={() => handleSelect(member._id)}
                sx={{
                  color: '#738496',
                     height:'10px',
                      width:'10px',
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
