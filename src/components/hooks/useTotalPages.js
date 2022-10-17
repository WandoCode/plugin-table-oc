import { useState, useEffect } from 'react'

const getNbrTotPages = (datas, nbrItemsByPage) => {
  const nbrFullPage = Math.floor(datas.length / nbrItemsByPage)
  const partialPage = datas.length % nbrItemsByPage
  return partialPage ? nbrFullPage + 1 : nbrFullPage
}

function useTotalPages(filteredDatas, nbrItemsByPage) {
  const [totalPage, setTotalPage] = useState()

  useEffect(() => {
    setTotalPage(getNbrTotPages(filteredDatas, nbrItemsByPage))
  }, [nbrItemsByPage, filteredDatas])
  return totalPage
}

export default useTotalPages
