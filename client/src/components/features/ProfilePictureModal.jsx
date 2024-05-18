import axios from "axios";
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ProfilePictureModal = ({ isOpen, onClose, results }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const imgRef = useRef(null);

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

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    if (imgRef.current && croppedArea.width && croppedArea.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, croppedAreaPixels);
      onSave(croppedImageUrl, croppedArea); // Pass cropping info to onSave
    }
  };

  const getCroppedImg = (image, { x, y, width, height }) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg");
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:7777/picture/661f46deaef4b520b8df50d4",
        selectedImage
      );
      console.log(selectedImage);
      console.log("Response:", response.data);
      console.log("Availability data saved successfully");
    } catch (error) {
      console.error("Error saving availability", error);
    }
    onClose();
  };

  if (!isOpen) {
    return null; // Render nothing if modal is not open
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="modal-container bg-white p-6 rounded-md shadow-lg max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Change Profile Picture</h2>
          {selectedImage && (
            <div className="mb-4">
              <img
                src={selectedImage}
                alt="avatarUrl"
                className="max-w-full mb-5 rounded-md"
              />
              <ReactCrop
                src={selectedImage}
                crop={crop}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
                imageStyle={{ maxHeight: "300px", maxWidth: "100%" }}
                ref={imgRef}
              />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 rounded mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 rounded text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictureModal;
