import {useState} from 'react'
import {BsThreeDots} from 'react-icons/bs' // Optional icon for "..."
import {ImgUploader} from './ImgUploader'

export function BackgroundSelector({onSelectBackground}) {
  const [selected, setSelected] = useState(null)
  const [selectedImage, setSelectedImage] = useState('https://picsum.photos/seed/board1/400/200') // Set the default image URL

  const [showOptions, setShowOptions] = useState(false) // Toggle options box visibility
  const [customUrl, setCustomUrl] = useState('')

  // Sample image URLs (replace with actual Unsplash URLs)
  const images = [
    '/imgs/board1.jpg',
    '/imgs/board2.jpg',
    '/imgs/board3.jpg',
    '/imgs/board4.jpg',
    '/imgs/board5.jpg',
    '/imgs/board6.jpg',
    '/imgs/board7.jpg',
    '/imgs/board8.jpg',
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
      <div className="background-preview-container">
        {selectedImage && (
          <div className="background-preview" style={{backgroundImage: `url(${selectedImage})`}}>
            <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt role="presentation" />
          </div>
        )}
      </div>

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
      </div>
    </div>
  )
}
