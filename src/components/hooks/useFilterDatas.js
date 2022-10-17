import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'

function useFilterDatas(datas, sorting, searchInput, headers) {
  const [filteredDatas, setFilteredDatas] = useState([])

  const sortDatas = () => {
    if (sorting.propriety.length === 0) return
    const sortedDatas = [...datas].sort((a, b) => {
      return a[sorting.propriety] > b[sorting.propriety]
        ? -1 * sorting.direction
        : 1 * sorting.direction
    })
    return sortedDatas
  }

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        const keys = getKeys(headers)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const element = data[key]
          if (element?.includes(searchInput.toLocaleLowerCase())) return true
        }
        return false
      })
      setFilteredDatas(newFilteredDatas)
    }
  }, [searchInput, datas, headers])

  useEffect(() => {
    if (sorting.propriety !== '') setFilteredDatas(sortDatas(filteredDatas))
  }, [sorting])

  return filteredDatas
}

export default useFilterDatas
