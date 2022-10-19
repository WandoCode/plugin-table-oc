import { configureStore } from '@reduxjs/toolkit'
import tableReducer from '../Table.reducer'

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
})
