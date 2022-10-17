import { useState, useEffect } from 'react'

function useFilterDatas(datas, sorting, searchInput, headers) {
  const [filteredDatas, setFilteredDatas] = useState(datas)

  const getKeys = (headers) => {
    return Object.keys(headers).filter((key) => key !== 'id')
  }

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
    setFilteredDatas(sortDatas(sorting, filteredDatas))
  }, [sorting])

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

  return filteredDatas
}

export default useFilterDatas
