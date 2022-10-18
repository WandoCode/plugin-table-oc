import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function useGetDatasToDisplay(datas, scroll) {
  const currentPage = useSelector((state) => state.table.currentPage)
  const sorting = useSelector((state) => state.table.sorting)
  const nbrItemsByPage = useSelector((state) => state.table.currentItemsByPage)

  const [displayedDatas, setDisplayedDatas] = useState([])
  const sortingRef = useRef(sorting)

  useEffect(() => {
    let dataToDisplay
    if (!scroll) dataToDisplay = paginate(datas, nbrItemsByPage, currentPage)

    if (scroll) {
      if (sortingRef.current !== sorting) {
        dataToDisplay = [...displayedDatas]
        sortingRef.current = sorting
      } else {
        const prevDatas = [...displayedDatas]
        const newDatas = paginate(datas, nbrItemsByPage, currentPage)
        dataToDisplay = [...prevDatas, ...newDatas]
      }
    }

    setDisplayedDatas(dataToDisplay)
  }, [currentPage, nbrItemsByPage, datas, sorting])

  // Pages start at 'page 1'
  const paginate = (datas, nbrItemsByPage, currentPage) => {
    const start = nbrItemsByPage * (currentPage - 1)
    const end = nbrItemsByPage * currentPage

    return datas.slice(start, end)
  }

  return displayedDatas
}

export default useGetDatasToDisplay
