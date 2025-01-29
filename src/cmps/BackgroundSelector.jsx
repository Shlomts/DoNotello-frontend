import {useState} from 'react'
import {BsThreeDots} from 'react-icons/bs'
import {ImgUploader} from './ImgUploader'

export function BackgroundSelector({onSelectBackground}) {
  const [selected, setSelected] = useState(null)
  const [selectedImage, setSelectedImage] = useState('/imgs/board1.jpg') 

  const [showOptions, setShowOptions] = useState(false) 
  const [customUrl, setCustomUrl] = useState('')

  const images = [
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062039/coffeMag_vezhli.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062049/cityFizza_kml6re.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1738062046/citySunset_nsfwyh.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955438/samples/balloons.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955440/samples/cup-on-a-table.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/beach-boat.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/architecture-signs.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955433/samples/landscapes/nature-mountains.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955432/samples/landscapes/girl-urban-view.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955429/sample.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955441/cld-sample-4.jpg',
    'https://res.cloudinary.com/dphepumae/image/upload/v1734955440/samples/coffee.jpg',
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
