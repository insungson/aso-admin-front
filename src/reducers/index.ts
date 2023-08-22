import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  authReducer,
  authSliceName,
  mainReducer,
  mainSliceName,
  memberReducer,
  memberSliceName,
  noticeReducer,
  noticeSliceName,
} from "./slices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AUTH"],
};

const reducers = combineReducers({
  [authSliceName]: authReducer,
  [mainSliceName]: mainReducer,
  [memberSliceName]: memberReducer,
  [noticeSliceName]: noticeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.REACT_APP_ENV_MODE !== "prod",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
