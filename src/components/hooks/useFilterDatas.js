import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'

function useFilterDatas(datas, searchInput, headers, showId) {
  const [filteredDatas, setFilteredDatas] = useState([])

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        const keys = getKeys(headers, showId)
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
