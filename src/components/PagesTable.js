import { useState } from 'react'
import Navigation from './Navigation'
import Select from './Select'
import '../style/index.css'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import useSort from './hooks/useSort'
import TableHeaders from './TableHeaders'
import { useSelector, useDispatch } from 'react-redux'
import { goToPage, sortTable, setCurrentItemsByPage } from './Table.actions'

function PagesTables({ datas }) {
  const dispatch = useDispatch()

  const search = useSelector((state) => state.table.search)
  const currentPage = useSelector((state) => state.table.currentPage)

  const [searchInput, setSearchInput] = useState('')

  const filteredDatas = useFilterDatas(datas, searchInput)
  const sortedDatas = useSort(filteredDatas)
  const totalPage = useTotalPages(sortedDatas)
  const datasToDisplay = useGetDatasToDisplay(sortedDatas, false)

  const rows = useRows(datasToDisplay, null)

  const onSorting = (newSorting) => {
    dispatch(sortTable(newSorting))
  }

  const handleNextPage = () => {
    const newCurrPage =
      currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
    dispatch(goToPage(newCurrPage))
  }

  const handlePrecPage = () => {
    const newCurrPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage
    dispatch(goToPage(newCurrPage))
  }

  const handleSelect = (e) => {
    dispatch(setCurrentItemsByPage(e.target.value))
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const handleCustomPage = (page) => {
    dispatch(goToPage(page))
  }

  return (
    <div className="table">
      <div className="table__navigation">
        <div className="table__select">
          <label htmlFor="itemsByPage">Items by page:</label>
          <Select onChoice={handleSelect} name="itemsByPage" />
        </div>
        <Navigation
          onNextPage={handleNextPage}
          onPrecPage={handlePrecPage}
          totalPage={totalPage}
          onCustomPage={handleCustomPage}
        />

        <div className="table__search">
          {search && (
            <>
              <label htmlFor="search">Search</label>
              <input
                type="text"
                name="search"
                id="search"
                value={searchInput}
                onChange={handleSearch}
              />
            </>
          )}
        </div>
      </div>
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

export default PagesTables
