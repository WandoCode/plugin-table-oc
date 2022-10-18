import { useState, useEffect, useRef } from 'react'

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
  const sortingRef = useRef(sorting)

  useEffect(() => {
    let dataToDisplay
    if (!scroll)
      dataToDisplay = paginate(nbrItemsByPage, currentPage, filteredDatas)
    if (scroll) {
      if (sortingRef.current !== sorting) {
        dataToDisplay = [...displayedDatas]
        sortingRef.current = sorting
      } else {
        const prevDatas = [...displayedDatas]
        const newDatas = paginate(nbrItemsByPage, currentPage, filteredDatas)
        dataToDisplay = [...prevDatas, ...newDatas]
      }
    }
    setDisplayedDatas(dataToDisplay)
  }, [currentPage, nbrItemsByPage, filteredDatas, sorting])

  return displayedDatas
}

export default useGetDatasToDisplay
