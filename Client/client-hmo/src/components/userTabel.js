import React, { useState, useEffect } from 'react';
import UserTableElement from './userTableElement';
import '../CSS/style.css';
import PopupCreateNewUser from './popupNewUser';
import axios from "axios"   
import { useDispatch } from 'react-redux';
import { loadUsersAction ,loadManufacturersAction} from '../redux/actions';
import Graph from './graph';

const UsersTable = () => {
  const [isPopupOpenNewUser, setIsPopupOpenNewUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch manufacturers
    axios.get('http://localhost:3030/manufacturer/getAllManufacturers')
      .then(response => {
        const data = response.data;
        console.log(data.getAllManufacturers); // Log the data
        dispatch(loadManufacturersAction(data.getAllManufacturers));
      })
      .catch(error => console.error('Error fetching manufacturers:', error));
  }, [dispatch]); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    // Fetch users
    axios.get('http://localhost:3030/user/getAllUsers')
      .then(response => {
        const data = response.data;
        console.log(data.getAllusers); // Log the data
        dispatch(loadUsersAction(data.getAllusers));
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [dispatch]); // Empty dependency array to ensure the effect runs only once
  const [isPopupGraph, setIsPopupGraph] = useState(false);

const toggleGraph = ()=>{
  setIsPopupGraph(!isPopupGraph)
}

  return (
    <div>
      {isPopupOpenNewUser && 
        <PopupCreateNewUser
          isPopupOpen={isPopupOpenNewUser}
          setIsPopupOpen={setIsPopupOpenNewUser}
        />
      }<button onClick={toggleGraph}>Present Graph</button>{     isPopupGraph&& <Graph></Graph>
    }
      <h1>User List</h1>
      <UserTableElement  dispatch={dispatch} setIsPopupOpenNewUser={setIsPopupOpenNewUser} />
    </div>
  );
};

export default UsersTable;
