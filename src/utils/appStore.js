import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { removeUser } from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionReducer,
  request: requestReducer,
});

const rootReducer = (state, action) => {
  if (action.type === removeUser.type) {
    return appReducer(undefined, action); // every slice goes back to null
  }
  return appReducer(state, action);
};

const appStore = configureStore({ reducer: rootReducer });

export default appStore;