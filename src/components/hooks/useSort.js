import { useState, useEffect } from 'react'

function useSort(datas, sorting) {
  const [sortedDatas, setSortedDatas] = useState(datas)

  const sortDatas = (datas) => {
    if (sorting.propriety.length === 0) return
    const sortedDatas = [...datas].sort((a, b) => {
      return a[sorting.propriety] > b[sorting.propriety]
        ? -1 * sorting.direction
        : 1 * sorting.direction
    })
    return sortedDatas
  }

  useEffect(() => {
    if (sorting.propriety !== '') setSortedDatas(sortDatas(datas))
    else setSortedDatas(datas)
  }, [datas])

  return sortedDatas
}

export default useSort
