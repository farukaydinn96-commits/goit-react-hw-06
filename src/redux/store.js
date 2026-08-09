import { configureStore } from "@reduxjs/toolkit";
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
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const customStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, item) => {
    return Promise.resolve(localStorage.setItem(key, item));
  },
  removeItem: (key) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

const contactsPersistConfig = {
  key: "contacts",
  storage: customStorage, // Sorunlu kütüphane yerine kendi yazdığımız garantili depoyu kullanıyoruz
};

const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer,
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
