import React, { useState } from 'react';
import '../CSS/style.css';
import axios from "axios"   
import { addNewUserAction } from '../redux/actions';
import { useDispatch } from 'react-redux';

const PopupCreateNewUser = ({isPopupOpen ,setIsPopupOpen}) => {
    const dispatch = useDispatch();

    // State to manage whether the popup is open or closed

    // State to store user details in the popup
    const [newUserDetails, setNewUserDetails] = useState({
        firstName: '',
        lastName: '',
        identity: '',
        birthday: '',
        phone: '',
        cellPhone: '',
        cityName: '',
        streetName: '',
        houseNum: ''
    });
    
    const handlePopupClear = () => {
        // Reset newUserDetails to an empty object when the popup is closed
        setNewUserDetails({
            firstName: '',
            lastName: '',
            identity: '',
            birthday: '',
            phone: '',
            cellPhone: '',
            cityName: '',
            streetName: '',
            houseNum: ''
        });
        // Other logic to close the popup
       
    };

    // Function to handle input change in the popup
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3030/User/newUser', newUserDetails) // Pass newUserDetails directly
            .then((response) => {
                if (response.status === 200) {
                  axios.get(`http://localhost:3030/user/getUserById/${newUserDetails.identity}`)
          .then((userDataResponse) => {
            const updatedUserData = userDataResponse.data.user;             
            console.log('User created successfully');
            dispatch(addNewUserAction(updatedUserData)); // Dispatch newUserDetails directly
            setIsPopupOpen(false);// Dispatch action with updated user data
          })
          .catch((error) => {
            console.error('Error fetching updated user data:', error);
            alert('An error occurred while fetching updated user data.');
          });

                } else {
                    console.error('Error creating new user:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error creating new user:', error.message);
                alert('An error occurred while creating a new user. Please try again later.');
            });
    };
    

    return (
        isPopupOpen && 
          (<div className="popup">
            <button onClick={handlePopupClear}>Clear</button>
            <button onClick={() => setIsPopupOpen(false)}>Close</button>
            <form onSubmit={handleSubmit}>
              <label>
                Identity:
                <input  title="numbers only" pattern="[0-9]*" type="text" name="identity" value={newUserDetails.identity} onChange={handleInputChange} required={true} />
              </label>
              <label>
                First Name:
                <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only"
                type="text" name="firstName" value={newUserDetails.firstName} onChange={handleInputChange} required={true}/>
              </label>
              <label>
                Last Name:
                <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="lastName" value={newUserDetails.lastName} onChange={handleInputChange} required={true}/>
              </label>
              <label>
                Birthday:
                <input required="true" type="date" name="birthday" value={newUserDetails.birthday} onChange={handleInputChange} />
              </label>
              <label>
                Phone:
                <input pattern="[0-9]*" 
          title="numbers only" type="tel" name="phone" value={newUserDetails.phone} onChange={handleInputChange} />
              </label>
              <label>
                Cell Phone:
                <input pattern="[0-9]*" 
          title="numbers only" type="tel" name="cellPhone" value={newUserDetails.cellPhone} onChange={handleInputChange} />
              </label>
              <label>
                City Name:
                <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="cityName" value={newUserDetails.cityName} onChange={handleInputChange} />
              </label>
              <label>
                Street Name:
                <input pattern="[A-Za-z\u0590-\u05FF\s]+" // Includes English letters and Hebrew characters, as well as whitespace
          title="letters only" type="text" name="streetName" value={newUserDetails.streetName} onChange={handleInputChange} />
              </label>
              <label>
                House Num:
                <input pattern="[0-9]*" 
          title="numbers only" type="text" name="houseNum" value={newUserDetails.houseNum} onChange={handleInputChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>)
        
      );
};

export default PopupCreateNewUser;
