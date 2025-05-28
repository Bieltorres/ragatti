import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import navbarReducer from "./slices/navnarSlice";
import { combineReducers } from "redux";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['id', 'login', 'user', 'navbar'],
};

const rootReducer = combineReducers({
  user: userReducer,
  navbar: navbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
