import axios from "axios";
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useAuth } from "./AuthContext";

const ProfilePictureModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const imgRef = useRef(null);
  const [aspect, setAspect] = useState(16 / 9);
  const { user: authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleCropComplete = (crop, pixelCrop) => {
    console.log("Crop completed:", crop, pixelCrop);
  };

  const handleSave = async () => {
    setIsLoading(true); // Start loading

    if (selectedImage && imgRef.current && crop.width && crop.height) {
      console.log("Image Reference:", imgRef.current);
      console.log("Crop Info:", crop);

      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(async (blob) => {
        console.log("Blob created", blob);
        const formData = new FormData();
        formData.append("profileImage", blob, "profile-pic.jpg");
        formData.append("userId", authUser.userId); // Add the userId field

        try {
          const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/upload`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Picture data saved successfully:", response.data);
          setAvatarUrl(response.data.filePath); // Update the avatar URL in the state
          alert("Data saved successfully");
          onClose();
        } catch (error) {
          console.error("Error saving Picture:", error);
        }
      }, "image/jpeg");
    } else {
      alert("Required conditions for image saving are not met");
      console.log("Required conditions for image saving are not met");
    }
    setIsLoading(false); // end loading
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
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={handleCropComplete}
                minHeight={100}
              >
                <img
                  ref={imgRef}
                  src={selectedImage}
                  alt="Crop me"
                  onload={onImageLoad}
                />
              </ReactCrop>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange}/>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 rounded mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-teal-500 rounded text-white"
              onClick={handleSave}
            >
              Save
            </button>
            {avatarUrl && (
              <div className="mt-4">
                <img
                  src={avatarUrl}
                  alt="Profile Avatar"
                  style={{ width: "100%", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictureModal;
