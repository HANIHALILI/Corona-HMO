import React, { useState, useEffect } from 'react';

const ImageDisplay = ({  isEditable ,updateUserDetails , setUpdateUserDetails}) => {
    const [imageData, setImageData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditImage, setIsEditImage] = useState(false);

    useEffect(() => {
        if (updateUserDetails && updateUserDetails.image && updateUserDetails.image.data) {
            const { contentType, data } = updateUserDetails.image;
            const base64Data = btoa(
                new Uint8Array(data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            const imageDataUrl = `data:${contentType.toLowerCase()};base64,${base64Data}`;
            setImageData(imageDataUrl);
        }
    }, [updateUserDetails]);


 
    const handleDelete = async () => {
        try {
            setUpdateUserDetails({ ...updateUserDetails, image: null });
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleUpdate = () => {
        setIsEditImage(true)
       
   };

   const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    console.log("Selected file:", file); 
    setSelectedFile(file);
    if (!file) {
        console.log('No file selected');
        return;
    }

    // Read the selected file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = () => {
        // Check if reader.result is not null or undefined before setting the state
        if (reader.result) {
            setUpdateUserDetails({ ...updateUserDetails, image: { contentType: file.type, data: reader.result } });
            setIsEditImage(false);
        } else {
            console.log('Error: Failed to read the selected file');
        }
    };
    reader.readAsDataURL(file);
};
    return (


            <div className="profile-picture-container"> 
            {imageData && <img className="profile-picture" src={imageData} alt="User Image" />} {/* Apply profile-picture class */}
            {isEditable && (
                <div className="image-options"> {/* Apply image-options class */}
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
            {isEditImage&&<div>
            <input type="file" accept='image/*' onChange={handleFileChange} />
            
        </div>}
        </div>
    );
};

export default ImageDisplay;

