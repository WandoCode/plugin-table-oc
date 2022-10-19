import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './table/Table.reducer'

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
})
