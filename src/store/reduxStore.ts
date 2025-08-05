import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import { ubietyBaseApiSlice } from '../services/baseQuery'

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
    [ubietyBaseApiSlice.reducerPath]: ubietyBaseApiSlice.reducer,
});


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            ubietyBaseApiSlice.middleware,
        ),
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)


