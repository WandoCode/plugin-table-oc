import { useState, useEffect } from 'react'
import { getKeys } from '../utility/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { goToPage } from '../Table.actions'

function useFilterDatas(datas, searchInput) {
  const dispatch = useDispatch()
  const headers = useSelector((state) => state.table.headers)
  const showId = useSelector((state) => state.table.showId)

  const [filteredDatas, setFilteredDatas] = useState([])

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        return isInputInData(data)
      })

      setFilteredDatas(newFilteredDatas)
    }
    dispatch(goToPage(1))
  }, [searchInput, datas, headers])

  const isInputInData = (data) => {
    const keys = getKeys(headers, showId)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const elementStr = String(data[key])
      const element = elementStr.toLowerCase()
      if (element?.includes(searchInput.toLowerCase())) return true
    }

    return false
  }

  return filteredDatas
}

export default useFilterDatas
