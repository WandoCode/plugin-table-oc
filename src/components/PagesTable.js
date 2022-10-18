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
  const search = useSelector((state) => state.table.search)

  const [searchInput, setSearchInput] = useState('')

  const filteredDatas = useFilterDatas(datas, searchInput)
  const sortedDatas = useSort(filteredDatas)
  const totalPage = useTotalPages(sortedDatas)
  const datasToDisplay = useGetDatasToDisplay(sortedDatas, false)

  const rowsDOM = useRows(datasToDisplay, null)

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="table">
      <div className="table__navigation">
        <div className="table__select">
          <label htmlFor="itemsByPage">Items by page:</label>
          <Select name="itemsByPage" />
        </div>
        <Navigation totalPage={totalPage} />

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

export default PagesTables
