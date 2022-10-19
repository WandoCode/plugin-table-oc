import { useState } from 'react'
import Navigation from './Navigation'
import Select from './Select'
import '../style/index.css'

import TableHeaders from './TableHeaders'
import { useSelector } from 'react-redux'
import {
  useRows,
  useSort,
  useTotalPages,
  useGetDatasToDisplay,
  useFilterDatas,
} from '../utility/hooks/index'

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
