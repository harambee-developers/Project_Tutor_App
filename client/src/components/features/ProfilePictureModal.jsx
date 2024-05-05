import React, { useRef, useState } from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const ProfilePictureModal = ({ isOpen, onClose, onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({aspect: 1/1})
  const imgRef = useRef(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current,crop)
      onSave(croppedImageUrl)
      onClose()
    }
  }

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
    return canvas.toDataURL('image/jpeg')
  }

  const handleSave = () => {
    if (selectedImage) {
      onSave(selectedImage);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50">
        <div className="bg-white p-6 rounded-md z-50">
          <h2 className="text-lg font-semibold mb-4">Change Profile Picture</h2>
          {selectedImage && (
            <div className="mb-4">
            <ReactCrop
              src={selectedImage}
              crop={crop}
              alt="Selected Image"
              className="max-w-full mb-5 rounded-md"
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleCropComplete}
              imageStyle={{maxHeight: '300px', maxWidth: '100%'}}
              ref={imgRef}
            />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-gray-300 rounded mr-4" onClick={onclose}>
              cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 rounded mr-4"
              onClick={handleCropComplete}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
