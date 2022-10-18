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

const setItemsByPage = createAction('table/setItemsByPage', (itemsByPage) => ({
  payload: { itemsByPage },
}))

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

export {
  setSearch,
  setHeaders,
  setDefaultItemsByPage,
  setItemsByPage,
  setDefaultSort,
  setSort,
  setShowId,
}
