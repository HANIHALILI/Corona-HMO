import React, { useState } from 'react';
import PopupDetails from './popupDetails';
import PopupDelete from './popupDelete'
import '../CSS/style.css';
import { useDispatch ,useSelector} from 'react-redux';

const UserTableElement = ({setIsPopupOpenNewUser }) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();   
  const [showPopupDetails, setShowPopupDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const togglePopupDetails = (user) => {
    setSelectedUser(user);
    setShowPopupDetails(!showPopupDetails);
  };

  return (
    <div className="table-container">

      <table className="table">
        <thead>
          <tr>
           <th>Identity</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions<button onClick={()=>setIsPopupOpenNewUser(true)}>Create New User</button>
</th>
          </tr>
        </thead>
        <tbody>
  { (
    users.map((user) => (
      <tr key={user._id}>
    <td>{user.identity}</td>
       <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button onClick={() => togglePopupDetails(user)}>View Details</button>
              </td>
      </tr>
    ))
  )}
</tbody>
      </table>

      {showPopupDetails && selectedUser && (
        <PopupDetails  setUser={setSelectedUser} user={selectedUser} onClose={togglePopupDetails} />
      )}

    </div>
  );
};

export default UserTableElement;
