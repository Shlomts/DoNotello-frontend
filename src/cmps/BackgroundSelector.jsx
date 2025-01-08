import {useState} from 'react'
import {BsThreeDots} from 'react-icons/bs' // Optional icon for "..."
import {ImgUploader} from './ImgUploader'

export function BackgroundSelector({onSelectBackground}) {
  const [selected, setSelected] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  const [showOptions, setShowOptions] = useState(false) // Toggle options box visibility
  const [customUrl, setCustomUrl] = useState('')

  // Sample image URLs (replace with actual Unsplash URLs)
  const images = [
    'https://picsum.photos/seed/board1/400/200',
    'https://picsum.photos/seed/board2/400/200',
    'https://picsum.photos/seed/board3/400/200',
    'https://picsum.photos/seed/board4/400/200',
    'https://picsum.photos/seed/board5/400/200',
    'https://picsum.photos/seed/board6/400/200',
    'https://picsum.photos/seed/board7/400/200',
  ]

  function handleSelect(index, url) {
    setSelected(index)
    setSelectedImage(url) // Update the selected image preview
    onSelectBackground(url) // Notify parent component about the selected background
  }

  function handleUrlChange(ev) {
    setCustomUrl(ev.target.value)
  }

  function handleUrlSubmit() {
    if (customUrl) {
      setSelectedImage(customUrl)
      onSelectBackground(customUrl)
      setShowOptions(false) // Close options box after submission
    }
  }

  function handleUpload(url) {
    setSelectedImage(url)
    onSelectBackground(url)
    setShowOptions(false) // Close options box after upload
  }

  return (
    <div className="background-selector">
      {/* Display preview of selected image */}
      {selectedImage && (
        <div className="background-preview" style={{backgroundImage: `url(${selectedImage})`}}>
          <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt role="presentation" />
        </div>
      )}

      {/* Background image selection */}
      <div className="background-options">
        {images.map((url, index) => (
          <div
            key={index}
            className={`background-item ${selected === index ? 'selected' : ''}`}
            style={{backgroundImage: `url(${url})`}}
            onClick={() => handleSelect(index, url)}
          >
            {/* {selected === index && <div className="checkmark">✓</div>} */}
          </div>
        ))}

        {/* Dark box with ellipsis */}
        <div className="background-item options-box" onClick={() => setShowOptions(!showOptions)}>
          <BsThreeDots size={24} />
        </div>
        {/* Options box for URL input or image upload */}
        {showOptions && (
          <div className="options-menu">
            <div className="url-input">
              <input type="url" placeholder="Enter background image URL" value={customUrl} onChange={handleUrlChange} />
              <button onClick={handleUrlSubmit}>Add URL</button>
            </div>
            <ImgUploader onUploaded={handleUpload} />
          </div>
        )}
      </div>
    </div>
  )
}
