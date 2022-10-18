import { createReducer } from '@reduxjs/toolkit'
import {
  setDefaultItemsByPage,
  setDefaultSort,
  setHeaders,
  setItemsByPage,
  setSearch,
  setShowId,
  setSort,
} from './Table.actions'

const initialState = {
  headers: {},
  defaultItemsByPage: null,
  itemsByPage: [],
  defaultSort: '',
  sort: false,
  search: false,
  showId: false,
}

const tableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSearch, (state, action) => {
      state.search = action.payload.status
    })
    .addCase(setHeaders, (state, action) => {
      state.headers = action.payload.headers
    })
    .addCase(setDefaultItemsByPage, (state, action) => {
      state.defaultItemsByPage = action.payload.defaultItemsByPage
    })
    .addCase(setItemsByPage, (state, action) => {
      state.itemsByPage = action.payload.itemsByPage
    })
    .addCase(setDefaultSort, (state, action) => {
      state.defaultSort = action.payload.defaultSort
    })
    .addCase(setSort, (state, action) => {
      state.sort = action.payload.sort
    })
    .addCase(setShowId, (state, action) => {
      state.showId = action.payload.showId
    })
})

export default tableReducer
