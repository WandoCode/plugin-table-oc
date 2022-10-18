import { useState, useCallback, useRef } from 'react'

import '../style/index.css'
import TableHeaders from './TableHeaders'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import useSort from './hooks/useSort'

function ScrollTable({
  headers,
  datas,
  defaultItemsByPage = 5,
  defaultSort = '',
  sort = true,
  showId = false,
}) {
  const observer = useRef()
  const nbrItemsByPage = defaultItemsByPage
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState({
    propriety: defaultSort,
    direction: 1,
  })

  const filteredDatas = useFilterDatas(datas, '', headers, showId)
  const totalPage = useTotalPages(filteredDatas, nbrItemsByPage)
  const datasToDisplay = useGetDatasToDisplay(
    filteredDatas,
    nbrItemsByPage,
    currentPage,
    sorting,
    true
  )
  const finalDatas = useSort(datasToDisplay, sorting)

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(handleObserver)
      if (node) observer.current.observe(node)
    },
    [datasToDisplay]
  )

  const rows = useRows(finalDatas, headers, lastItemRef, showId)

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      handleNextPage()
    }
  }

  const handleNextPage = () => {
    const newCurrPage =
      currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
    setCurrentPage(newCurrPage)
  }
  const onSorting = (newSorting) => {
    setSorting(newSorting)
  }
  return (
    <div className="table">
      <div className="table">
        <table>
          <TableHeaders
            headers={headers}
            showId={showId}
            sorting={sorting}
            sort={sort}
            onSorting={onSorting}
          />
          <tfoot>
            <tr>
              <td colSpan="3">{filteredDatas.length} entries</td>
              <td colSpan="6"></td>
            </tr>
          </tfoot>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ScrollTable
