import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function useSort(datas) {
  const sorting = useSelector((state) => state.table.sorting)

  const [sortedDatas, setSortedDatas] = useState(datas)

  const sortDatas = () => {
    if (sorting.propriety.length === 0) return
    const sortedDatas = [...datas].sort((a, b) => {
      return a[sorting.propriety] > b[sorting.propriety]
        ? 1 * sorting.direction
        : -1 * sorting.direction
    })
    return sortedDatas
  }

  useEffect(() => {
    if (sorting.propriety !== '') setSortedDatas(sortDatas(datas))
    else setSortedDatas(datas)
  }, [datas, sorting])

  return sortedDatas
}

export default useSort
