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
  scroll
) {
  const [displayedDatas, setDisplayedDatas] = useState([])

  useEffect(() => {
    if (!scroll)
      setDisplayedDatas(paginate(nbrItemsByPage, currentPage, filteredDatas))
    if (scroll) {
      const prevDatas = [...displayedDatas]
      const newDatas = paginate(nbrItemsByPage, currentPage, filteredDatas)
      setDisplayedDatas([...prevDatas, ...newDatas])
    }
  }, [currentPage, nbrItemsByPage, filteredDatas])

  return displayedDatas
}

export default useGetDatasToDisplay
