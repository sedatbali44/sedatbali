import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';

import departmentsSlice from './slices/departmentsSlice';
import ordersSlice from './slices/ordersSlice';
import employeesSlice from './slices/empolyeesSlice';
import teamsSlice from 'pages/dashboard/Teams/store/teamsSlice';
import generalSlice from './slices/generalSlice';
import socketSlice from './slices/socketSlice';

import authSlices from './slices/authSlices';
import { persistReducer } from 'redux-persist';

import { departmentQuery } from 'pages/dashboard/Departments/store/departmentQuery';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  socket: socketSlice,
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  departments: departmentsSlice,
  employees: employeesSlice,
  orders: ordersSlice,
  teams: teamsSlice,
  generals: generalSlice,
  auth: persistReducer(rootPersistConfig, authSlices),
  product: productReducer,
  [departmentQuery.reducerPath]: departmentQuery.reducer,
});

export { rootPersistConfig, rootReducer };
