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
import { useSelector } from 'react-redux'

function PagesTables({ datas }) {
  const defaultItemsByPage = useSelector(
    (state) => state.table.defaultItemsByPage
  )
  const defaultSort = useSelector((state) => state.table.defaultSort)
  const search = useSelector((state) => state.table.search)

  const [searchInput, setSearchInput] = useState('')
  const [nbrItemsByPage, setNbrItemsByPage] = useState(defaultItemsByPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState({
    propriety: defaultSort,
    direction: 1,
  })

  const filteredDatas = useFilterDatas(datas, searchInput)
  const sortedDatas = useSort(filteredDatas, sorting)
  const totalPage = useTotalPages(sortedDatas, nbrItemsByPage)
  const datasToDisplay = useGetDatasToDisplay(
    sortedDatas,
    nbrItemsByPage,
    currentPage,
    sorting,
    false
  )

  const rows = useRows(datasToDisplay, null)

  const onSorting = (newSorting) => {
    setSorting(newSorting)
  }

  const handleNextPage = () => {
    const newCurrPage =
      currentPage + 1 <= totalPage ? currentPage + 1 : currentPage
    setCurrentPage(newCurrPage)
  }

  const handlePrecPage = () => {
    const newCurrPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage
    setCurrentPage(newCurrPage)
  }

  const handleSelect = (e) => {
    setNbrItemsByPage(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const handleCustomPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="table">
      <div className="table__navigation">
        <div className="table__select">
          <label htmlFor="itemsByPage">Items by page:</label>
          <Select
            onChoice={handleSelect}
            name="itemsByPage"
            value={nbrItemsByPage}
          />
        </div>
        <Navigation
          onNextPage={handleNextPage}
          onPrecPage={handlePrecPage}
          currentPage={currentPage}
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
          <TableHeaders sorting={sorting} onSorting={onSorting} />
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
