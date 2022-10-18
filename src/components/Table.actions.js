import { createAction } from '@reduxjs/toolkit'

const setHeaders = createAction('table/setHeaders', (headers) => ({
  payload: { headers },
}))

const setDefaultItemsByPage = createAction(
  'table/setDefaultItemsByPage',
  (defaultItemsByPage) => ({
    payload: { defaultItemsByPage },
  })
)

const setPossibleItemsByPage = createAction(
  'table/setPossibleItemsByPage',
  (itemsByPageArr) => ({
    payload: { itemsByPageArr },
  })
)

const setDefaultSort = createAction('table/setDefaultSort', (defaultSort) => ({
  payload: { defaultSort },
}))

const setSort = createAction('table/setSort', (sort) => ({
  payload: { sort },
}))

const setSearch = createAction('table/setSearch', (status) => ({
  payload: { status },
}))

const setShowId = createAction('table/setShowId', (showId) => ({
  payload: { showId },
}))

const goToPage = createAction('table/goToPage', (page) => ({
  payload: { page },
}))

const sortTable = createAction('table/sortTable', (sorting) => ({
  payload: { sorting },
}))

const setCurrentItemsByPage = createAction(
  'table/setCurrentItemsByPage',
  (currentItemsByPage) => ({
    payload: { currentItemsByPage },
  })
)

export {
  setSearch,
  setHeaders,
  setDefaultItemsByPage,
  setPossibleItemsByPage,
  setDefaultSort,
  setSort,
  setShowId,
  goToPage,
  sortTable,
  setCurrentItemsByPage,
}
