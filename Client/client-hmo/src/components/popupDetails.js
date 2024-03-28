import React, { useState } from 'react';
import '../CSS/style.css';
import PopupDelete from './popupDelete'
import axios from "axios"   
import { useDispatch } from 'react-redux';
import {updateUserAction  } from '../redux/actions'
import { useSelector } from 'react-redux';
import ImageDisplay from './image'
const ExistingVaccinations = ({ setUpdateUserDetails,updateUserDetails,setViewVaccinationsState, setIsEditableVaccination ,isEditableVaccination}) => {
   const [newVaccinationState ,setNewVaccinationState ]= useState({
    dateReceived: '',
    manufacturer: '',
  });
  //manufacturers.find(manufacturer => manufacturer.manufacturerName === vaccineManufacturerName);
  const manufacturers = useSelector(state => state.manufacturers);

  const isFormValid = newVaccinationState.dateReceived.trim() !== '' && newVaccinationState.manufacturer.trim() !== '';
      const addNewVaccination = (e) => {
        if (!newVaccinationState || !newVaccinationState.dateReceived || !newVaccinationState.manufacturer) {
          // Do something if dateReceived or manufacturerName is missing
          return;
        }
         if (updateUserDetails.vaccinations && updateUserDetails.vaccinations.length >= 4) {
          // setIsDeleteVaccination(true)
        return; // Exit function if maximum limit reached
      }  
      if (isFormValid) {
        const updatedVaccinations = [...updateUserDetails.vaccinations||[], newVaccinationState];
        setUpdateUserDetails(prevState => ({
          ...prevState,
          vaccinations:updatedVaccinations}));
          setNewVaccinationState({
            manufacturer:"",
            dateReceived:""
          })
       
      } else {
        alert('Please fill in all required fields.'); // Alert the user if the form is not valid
      }


     };
     const onClose = () =>{
      setViewVaccinationsState(false)
     }

     //// להוסיף מחיקה אם עבר 4 ורוצים להוסיף ולהוסיף עריכה לחיסונים
     //  const[isDeleteVaccination , setIsDeleteVaccination] = useState(false)
    //  const deleteLastVaccination =()=>{
    //   const updatedVaccinations = [...updateUserDetails.vaccinations];
    //   // Sort the vaccinations by date received in ascending order (oldest to newest)
    //   updatedVaccinations.sort((a, b) => new Date(a.dateReceived) - new Date(b.dateReceived));
    //   // Remove the oldest vaccination (first element after sorting)
    //   updatedVaccinations.shift();
    //   // Update the state with the updated vaccinations
    //   setUpdateUserDetails(prevState => ({
    //       ...prevState,
    //       vaccinations: updatedVaccinations
    //   }));  console.log(updateUserDetails)   }
    const handleInputChange = (e)=>{
      const { name, value } = e.target;
      const { key } = e.target;
       if(key){
        setUpdateUserDetails(prevState => ({
          ...prevState,
          [name]: value
      }));
       }else{
        setNewVaccinationState(prevState => ({
          ...prevState,
          [name]: value
      }));
       }

    }
   
  return (
    <div className="popup">
     <span className="close" onClick={onClose}>&times;</span>
    <label>
      Vaccinations:
      {updateUserDetails.vaccinations && updateUserDetails.vaccinations.length > 0 ? (
        <ul>
  {updateUserDetails.vaccinations.map((vaccine) => (
    <li key={vaccine._id}>
<label>
    Date Received:
    <input
        name="dateReceived"
        onChange={handleInputChange}
        type="date"
        value={(vaccine.dateReceived ? new Date(vaccine.dateReceived).toISOString().split('T')[0] : '') || ''}
        readOnly={!isEditableVaccination}
    />
</label>
<label>
    Manufacturer:
    <input
        name="manufacturer"
        onChange={handleInputChange}
        type="text" // Change type to text for textual input
        value={vaccine.manufacturer || ''}
        readOnly={!isEditableVaccination}
    />
</label>
    </li>
  ))}
</ul>
) : (
  <span>No vaccinations recorded</span>
)}
    </label>
    {isEditableVaccination && (
      <>
        <label>
          New Vaccination Date Received:
          <input
            type="date"
            name="dateReceived"
            onChange={handleInputChange}
            required = {true}
            value={newVaccinationState.dateReceived}
          />
        </label>
        <label>
  New Vaccination Manufacturer:
  <select
  name="manufacturer"
  required={true}
  value={newVaccinationState.manufacturer}
  onChange={handleInputChange}
>
  <option value="">Select Manufacturer</option>
  {manufacturers.map((manufacturer) => (
    <option key={manufacturer._id} value={manufacturer._id}>
      {manufacturer.manufacturerName}
    </option>
  ))}
</select>
</label>
{/* {isDeleteVaccination&&<><span>Maximum number of vaccinations reached
</span><button onClick={deleteLastVaccination}>Delete last vaccination to add new</button></>} */}
        <button onClick={addNewVaccination}>Add</button>
        <span>To save press 'save'</span>
      </>
      
    )}
  </div>
  );
};

const PopupDetails = ({setUser, user, onClose} ) => {
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableVaccination, setIsEditableVaccination] = useState(false);
  const [viewVaccinationsState , setViewVaccinationsState ] = useState(false)


  const dispatch = useDispatch();

  const [updateUserDetails, setUpdateUserDetails] = useState({
    identity:user.identity,
    firstName: user.firstName,
    lastName:user.lastName,
    identity:user.identity,
    birthday:user.birthday,
    phone: user.phone,
    cellPhone: user.cellPhone,
    cityName: user.cityName,
    streetName: user.streetName,
    houseNum: user.houseNum,
    dateRecovery : user.dateRecovery,
    dateTestPositive : user.dateTestPositive,
    vaccinations:user.vaccinations?[...user.vaccinations]:[],
    image:user.image
    
});

  const togglePopupDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };
  const onUpdate = () => {
    setIsEditable(true);
    setIsEditableVaccination(true)// Enable editing when update button is clicked
  };
  // Function to handle cancel button click
  const handleCancelClick = () => {
    setIsEditable(false); // Disable editing when cancel button is clicked
    setIsEditableVaccination(false)// Enable editing when update button is clicked
    setUpdateUserDetails(user);
    // setUser(user);


  };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdateUserDetails(prevState => ({
          ...prevState,
          [name]: value
      }));
      
  };
    // Function to handle adding a new vaccination

    const handelViewVaccinations = ()=>{
      setViewVaccinationsState(true)
    }

const update = (e) => {
  e.preventDefault();
  axios.patch(`http://localhost:3030/user/updateById/${user.identity}`, updateUserDetails)
    .then((response) => {
      if (response.status === 200) {
        console.log('User updated successfully');
        // Fetch updated user data from the server
        axios.get(`http://localhost:3030/user/getUserById/${user.identity}`)
          .then((userDataResponse) => {
            const updatedUserData = userDataResponse.data.user; 
            console.log(updatedUserData)// Assuming response data contains updated user details
            setUser(updatedUserData)
            dispatch(updateUserAction(updatedUserData)); // Dispatch action with updated user data
            setUpdateUserDetails(updatedUserData);
            setIsEditableVaccination(false)
            setIsEditable(false)
          })
          .catch((error) => {
            console.error('Error fetching updated user data:', error);
            alert('An error occurred while fetching updated user data.');
          });
      } else {
        console.error('Error updating user:', response.statusText);
        alert('An error occurred while updating the user. Please try again later.');
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error.message);
      alert('An error occurred while updating the user. Please try again later.');
    });
};

  return (
    <div className="popup">
              <ImageDisplay identity={updateUserDetails.identity}  setUpdateUserDetails = {setUpdateUserDetails}updateUserDetails={updateUserDetails} isEditable={isEditable}></ImageDisplay>
              {  viewVaccinationsState&&  <ExistingVaccinations setViewVaccinationsState={setViewVaccinationsState} setUpdateUserDetails={setUpdateUserDetails} updateUserDetails={updateUserDetails} setIsEditableVaccination = {setIsEditableVaccination} isEditableVaccination = {isEditableVaccination}/>}

      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User Details</h2>
        <button onClick={handelViewVaccinations}>View vaccinations</button>


        <p  name="identity">Identity:{updateUserDetails.identity}</p>
        <form onSubmit={update}>
        <label>
          First Name:
          <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only"
          type="text" name="firstName" value={updateUserDetails.firstName|| ""} readOnly={!isEditable} onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="lastName" value={updateUserDetails.lastName|| ""} readOnly={!isEditable} onChange={handleInputChange}/>
        </label>
        <label>
          Birthday:
          <input required="true" type="date" name="birthday" value={new Date(updateUserDetails.birthday).toISOString().split('T')[0] || ""} readOnly={!isEditable}  onChange={handleInputChange}/>
        </label>
        <label>
          Phone:
          <input pattern="[0-9]*" 
          title="numbers only" type="tel" name="phone" value={updateUserDetails.phone|| ""} readOnly={!isEditable} onChange={handleInputChange} />
        </label>
        <label>
          Cell Phone:
          <input pattern="[0-9]*" 
          title="numbers only" type="tel" name="cellPhone" value={updateUserDetails.cellPhone|| ""} readOnly={!isEditable} onChange={handleInputChange}/>
        </label>
        <label>
          City Name:
          <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="cityName" value={updateUserDetails.cityName|| ""} readOnly={!isEditable} onChange={handleInputChange}/>
        </label>
        <label>
          Street Name:
          <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="streetName" value={updateUserDetails.streetName || ""} readOnly={!isEditable} onChange={handleInputChange}/>
        </label>
        <label>
          House Num:
          <input pattern="[0-9]*" 
          title="numbers only" type="text" name="houseNum" value={updateUserDetails.houseNum || ""} readOnly={!isEditable} onChange={handleInputChange}/>
        </label>
        <label>Corona Diseas:

      <label>
        Date Test Positive:
        <input
          type="date"
          readOnly={!isEditable}  
          name="dateTestPositive"
          value={(updateUserDetails.dateRecovery ? new Date(updateUserDetails.dateTestPositive).toISOString().split('T')[0] : "") || ""}   
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date Recovery:
        <input
          type="date"
          name="dateRecovery"
          readOnly={!isEditable}  
          value={(updateUserDetails.dateRecovery ? new Date(updateUserDetails.dateRecovery).toISOString().split('T')[0] : "") || "" }
          onChange={handleInputChange}
          
        />
      </label>
    </label>
    {isEditable && (
          <>
            <button onClick={handleCancelClick}>Cancel</button>
            <button type='submit'>Save</button>
          </>
        )}</form>


        {!isEditable && <button onClick={onUpdate}>Update</button>}

        { !isEditable  && <button onClick={() => togglePopupDelete()}>Delete</button>}

              </div>
              {showPopupDelete &&  (
        <PopupDelete userId={user.identity} togglePopupDelete={togglePopupDelete} onClose ={onClose} />
      )}

    </div>
  );
};  

export default PopupDetails;

