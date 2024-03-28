 export function deleteUserAction(userId) {
    return { type: 'DELETE_USER', payload: userId };
  }
  
  export function addNewUserAction(user) {
    return { type: 'ADD_USER', payload: user };
  }
  
  export function updateUserAction(user) {
    return { type: 'UPDATE_USER', payload: user };
  }
  export function loadUsersAction(usersList) {
    return { type: 'LOAD_USERS', payload: usersList };
  }
  export function getUsersAction(usersList) {
    return { type: 'GET_USERS', payload: usersList };
  }
  export function loadManufacturersAction(usersList) {
    return { type: 'LOAD_MANUFACTURERS', payload: usersList };
  }