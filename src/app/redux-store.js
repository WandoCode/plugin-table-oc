import { configureStore } from '@reduxjs/toolkit'
import tableReducer from '../components/Table.reducer'

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
})
