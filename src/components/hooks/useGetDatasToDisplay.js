import { useState, useEffect } from 'react'
// Pages start at 'page 1'
const paginate = (nbrItemsByPage, currentPage, datas) => {
  const start = nbrItemsByPage * (currentPage - 1)
  const end = nbrItemsByPage * currentPage
  return datas.slice(start, end)
}

function useGetDatasToDisplay(
  datas,
  nbrItemsByPage,
  currentPage,
  filteredDatas
) {
  const [displayedDatas, setDisplayedDatas] = useState(datas)

  useEffect(() => {
    setDisplayedDatas(paginate(nbrItemsByPage, currentPage, filteredDatas))
  }, [currentPage, nbrItemsByPage, filteredDatas])

  return displayedDatas
}

export default useGetDatasToDisplay
