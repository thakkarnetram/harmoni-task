import {combineReducers} from '@reduxjs/toolkit';
import taskReducer from './actions/actions';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
