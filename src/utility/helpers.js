const getKeys = (object, showId) => {
  if (showId) return Object.keys(object)
  else return Object.keys(object).filter((key) => key !== 'id')
}

export { getKeys }
