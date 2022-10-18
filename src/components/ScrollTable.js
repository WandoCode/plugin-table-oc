import { useState, useCallback, useRef } from 'react'

import '../style/index.css'
import TableHeader from './TableHeader'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import { getKeys } from '../utility/helpers'
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

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys(headers, showId)
    return keys.map((key) => {
      return (
        <th key={key} data-sort={key} onClick={handleSort}>
          {
            <TableHeader
              name={headers[key]}
              sorted={key === sorting.propriety}
              direction={sorting.direction}
              sort={sort}
            />
          }
        </th>
      )
    })
  }

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      handleNextPage()
    }
  }

  const handleSort = (e) => {
    const val = e.nativeEvent.path.find((el) =>
      el.dataset.sort ? true : false
    )
    const newSorting = { ...sorting }
    newSorting.direction =
      sorting.propriety === val.dataset.sort ? sorting.direction * -1 : 1
    newSorting.propriety = val.dataset.sort
    setSorting(newSorting)
  }

  const handleNextPage = () => {
    const newCurrPage =
      currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
    setCurrentPage(newCurrPage)
  }

  return (
    <div className="table">
      <div className="table__navigation">
        <div className="table__search"></div>
      </div>
      <div className="table">
        <table>
          {headers && (
            <thead>
              <tr>{headersDOM()}</tr>
            </thead>
          )}
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
