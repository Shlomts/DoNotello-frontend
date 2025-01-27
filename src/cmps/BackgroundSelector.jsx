import {useState} from 'react'
import {BsThreeDots} from 'react-icons/bs'
import {ImgUploader} from './ImgUploader'

export function BackgroundSelector({onSelectBackground}) {
  const [selected, setSelected] = useState(null)
  const [selectedImage, setSelectedImage] = useState('/imgs/board1.jpg') 

  const [showOptions, setShowOptions] = useState(false) 
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
    setSelectedImage(url)
    onSelectBackground(url)
  }

  // function handleUrlChange(ev) {
  //   setCustomUrl(ev.target.value)
  // }

  // function handleUrlSubmit() {
  //   if (customUrl) {
  //     setSelectedImage(customUrl)
  //     onSelectBackground(customUrl)
  //     setShowOptions(false)
  //   }
  // }

  // function handleUpload(url) {
  //   setSelectedImage(url)
  //   onSelectBackground(url)
  //   setShowOptions(false)
  // }

  return (
    <div className="background-selector">
      {/* Display preview of selected image */}
      <div className="background-preview-container">
        {selectedImage && (
          <div className="background-preview" style={{backgroundImage: `url(${selectedImage})`}}>
            <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="decorative" role="presentation" />
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
