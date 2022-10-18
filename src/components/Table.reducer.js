import { createReducer } from '@reduxjs/toolkit'
import {
  goToPage,
  setDefaultItemsByPage,
  setDefaultSort,
  setHeaders,
  setPossibleItemsByPage,
  setSearch,
  setShowId,
  setSort,
  sortTable,
  setCurrentItemsByPage,
} from './Table.actions'

const initialState = {
  headers: {},
  defaultItemsByPage: null,
  itemsByPageArr: [],
  defaultSort: '',
  sort: false,
  search: false,
  showId: false,
  currentPage: 1,
  sorting: { propriety: '', direction: 1 },
  currentItemsByPage: 1,
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
      state.currentItemsByPage = action.payload.defaultItemsByPage
    })
    .addCase(setPossibleItemsByPage, (state, action) => {
      state.itemsByPageArr = action.payload.itemsByPageArr
    })
    .addCase(setDefaultSort, (state, action) => {
      state.defaultSort = action.payload.defaultSort
      state.sorting.propriety = action.payload.defaultSort
    })
    .addCase(setSort, (state, action) => {
      state.sort = action.payload.sort
    })
    .addCase(setShowId, (state, action) => {
      state.showId = action.payload.showId
    })
    .addCase(goToPage, (state, action) => {
      state.currentPage = action.payload.page
    })
    .addCase(sortTable, (state, action) => {
      state.sorting = action.payload.sorting
    })
    .addCase(setCurrentItemsByPage, (state, action) => {
      state.currentItemsByPage = action.payload.currentItemsByPage
    })
})

export default tableReducer
