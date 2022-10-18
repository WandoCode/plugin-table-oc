import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const getNbrTotPages = (datas, nbrItemsByPage) => {
  const nbrFullPage = Math.floor(datas.length / nbrItemsByPage)
  const partialPage = datas.length % nbrItemsByPage
  return partialPage ? nbrFullPage + 1 : nbrFullPage
}

function useTotalPages(filteredDatas) {
  const nbrItemsByPage = useSelector((state) => state.table.currentItemsByPage)

  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setTotalPage(getNbrTotPages(filteredDatas, nbrItemsByPage))
  }, [nbrItemsByPage, filteredDatas])

  return totalPage
}

export default useTotalPages
