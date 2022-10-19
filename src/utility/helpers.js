const getKeys = (object, showId) => {
  if (showId) return Object.keys(object)
  else return Object.keys(object).filter((key) => key !== 'id')
}

const getNextPage = (currentPage, totalPage) => {
  return currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
}

export { getKeys, getNextPage }
