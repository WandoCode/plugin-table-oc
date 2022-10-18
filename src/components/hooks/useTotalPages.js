import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function useTotalPages(filteredDatas) {
  const nbrItemsByPage = useSelector((state) => state.table.currentItemsByPage)

  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setTotalPage(getNbrTotPages())
  }, [nbrItemsByPage, filteredDatas])

  const getNbrTotPages = () => {
    const nbrFullPage = Math.floor(filteredDatas.length / nbrItemsByPage)
    const partialPage = filteredDatas.length % nbrItemsByPage

    return partialPage ? nbrFullPage + 1 : nbrFullPage
  }

  return totalPage
}

export default useTotalPages
