import React from 'react';
import '../CSS/style.css';
import axios from "axios";
import { deleteUserAction } from '../redux/actions';
import { connect } from 'react-redux';

const PopupDelete = ({ userId, togglePopupDelete, dispatch , onClose }) => {

    const onDelete = (e) => {
        const {name} = e.target
        let ref = ""
        if(name == "delete"){
             ref = `http://localhost:3030/User/deleteUserByIdentity/${userId}`
        }
        else{
            ref = `http://localhost:3030/User/deleteAllUserByIdentity/${userId}`
        }
        axios.delete(ref)
            .then((ress) => {
                if (ress.status === 200) {
                    console.log('User deleted successfully');
                    dispatch(deleteUserAction({ identity: userId }));
                    togglePopupDelete()
                    onClose()
                } else {
                    console.error('Failed to delete user');
                    // Show user-friendly error message
                    alert('Failed to delete user. Please try again later.');
                }
            })
            .catch((err) => {
                console.error(err.message);
                // Show user-friendly error message
                alert('An error occurred while deleting the user. Please try again later.');
            });
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={togglePopupDelete}>&times;</span>
                <h2>Delete User</h2>
                <p>Delete user?</p>
                <button name = "delete" onClick={(event) => onDelete(event)}>Delete</button>
                <button name="deleteAll" onClick={(event) => onDelete(event)}>Also delete vaccination and disease information</button>
                <button onClick={togglePopupDelete}>Cancel</button>
            </div>
        </div>
    );
};

// Define mapStateToProps even if it's empty
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PopupDelete);
