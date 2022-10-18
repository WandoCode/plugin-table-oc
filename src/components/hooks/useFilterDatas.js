import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'

function useFilterDatas(datas, searchInput, headers, showId) {
  const [filteredDatas, setFilteredDatas] = useState([])

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        return isInputInData(data, searchInput, headers, showId)
      })

      setFilteredDatas(newFilteredDatas)
    }
  }, [searchInput, datas, headers])

  const isInputInData = (data, searchInput, headers, showId) => {
    const keys = getKeys(headers, showId)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const element = data[key]?.toLowerCase()
      if (element?.includes(searchInput.toLowerCase())) return true
    }

    return false
  }

  return filteredDatas
}

export default useFilterDatas
