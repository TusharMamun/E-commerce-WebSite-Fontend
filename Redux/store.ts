import { configureStore } from '@reduxjs/toolkit'
import sofireducer from './sofislise'
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

// Create a no-op storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

// Use appropriate storage based on environment
const storage = typeof window !== 'undefined' 
  ? createWebStorage('local') 
  : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, sofireducer)

export const store = configureStore({
  reducer: {
    sofi: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persisdata = persistStore(store)