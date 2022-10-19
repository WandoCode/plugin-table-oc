import { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../style/index.css'
import TableHeaders from './TableHeaders'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import useSort from './hooks/useSort'
import { goToPage } from './Table.actions'
import { getNextPage } from './utility/helpers'

function ScrollTable({ datas }) {
  const dispatch = useDispatch()

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

  const rowsDOM = useRows(finalDatas, lastItemRef)

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      loadNextPage()
    }
  }

  const loadNextPage = () => {
    const newCurrPage = getNextPage(currentPage, totalPage)

    dispatch(goToPage(newCurrPage))
  }

  return (
    <div className="table">
      <div className="table">
        <table>
          <TableHeaders />
          <tfoot>
            <tr>
              <td colSpan="3">{filteredDatas.length} entries</td>
              <td colSpan="6"></td>
            </tr>
          </tfoot>
          <tbody>{rowsDOM}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ScrollTable
