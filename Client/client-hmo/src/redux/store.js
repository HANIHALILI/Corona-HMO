import { createStore } from 'redux';

// Define initial state
const initialState = {
  users: [],
  manufacturers: []
};

// Define reducer function
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.identity !== action.payload.identity)
      };  
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
  
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.identity === action.payload.identity) {
            return action.payload;
          } else {
            return user;
          }
        })
      };
      
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.payload
      };
      
    case 'LOAD_MANUFACTURERS':
      return {
        ...state,
        manufacturers: action.payload
      };

    default:
      return state;
  }
};

// Create Redux store
const store = createStore(rootReducer);

export default store;
