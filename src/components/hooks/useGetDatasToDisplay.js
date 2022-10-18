import { useState, useEffect } from 'react'

// Pages start at 'page 1'
const paginate = (nbrItemsByPage, currentPage, datas) => {
  const start = nbrItemsByPage * (currentPage - 1)
  const end = nbrItemsByPage * currentPage
  return datas.slice(start, end)
}

function useGetDatasToDisplay(
  nbrItemsByPage,
  currentPage,
  filteredDatas,
  sorting,
  scroll
) {
  const [displayedDatas, setDisplayedDatas] = useState([])

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
    let dataToDisplay
    if (!scroll)
      dataToDisplay = paginate(nbrItemsByPage, currentPage, filteredDatas)
    if (scroll) {
      const prevDatas = [...displayedDatas]
      const newDatas = paginate(nbrItemsByPage, currentPage, filteredDatas)
      dataToDisplay = [...prevDatas, ...newDatas]
    }

    if (sorting.propriety !== '') setDisplayedDatas(sortDatas(dataToDisplay))
    else setDisplayedDatas(dataToDisplay)
  }, [currentPage, nbrItemsByPage, filteredDatas, sorting])

  return displayedDatas
}

export default useGetDatasToDisplay
