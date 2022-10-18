import { useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../style/index.css'
import TableHeaders from './TableHeaders'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import useSort from './hooks/useSort'
import { goToPage, sortTable } from './Table.actions'

function ScrollTable({ datas }) {
  const dispatch = useDispatch()

  const defaultItemsByPage = useSelector(
    (state) => state.table.defaultItemsByPage
  )
  const currentPage = useSelector((state) => state.table.currentPage)

  const filteredDatas = useFilterDatas(datas, '')
  const totalPage = useTotalPages(filteredDatas)
  const datasToDisplay = useGetDatasToDisplay(filteredDatas, true)
  const finalDatas = useSort(datasToDisplay)

  const observer = useRef()
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(handleObserver)
      if (node) observer.current.observe(node)
    },
    [datasToDisplay]
  )

  const rows = useRows(finalDatas, lastItemRef)

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      handleNextPage()
    }
  }

  const handleNextPage = () => {
    const newCurrPage =
      currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
    dispatch(goToPage(newCurrPage))
  }

  const onSorting = (newSorting) => {
    dispatch(sortTable(newSorting))
  }

  return (
    <div className="table">
      <div className="table">
        <table>
          <TableHeaders onSorting={onSorting} />
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
