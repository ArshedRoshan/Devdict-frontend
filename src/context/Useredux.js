import { createStore } from 'react-redux';

const initialState = {
    users: []
  };

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'setUsers':
        return {
          data: [...state.data, action.payload]
        };
      default:
        return state;
    }
  }

const store = createStore(rootReducer);