const getKeys = (object) => {
  return Object.keys(object).filter((key) => key)
}

// const getKeys = (object) => {
//   return Object.keys(object).filter((key) => key !== 'id')
// }
export { getKeys }
