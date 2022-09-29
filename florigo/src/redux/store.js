import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { rootReducer } from './rootReducer';
import { departmentQuery } from 'pages/dashboard/Departments/store/departmentQuery';
import { setupListeners } from '@reduxjs/toolkit/query';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(departmentQuery.middleware),
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
