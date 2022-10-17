import { useState, useEffect, useCallback, useRef } from 'react'
import Navigation from './Navigation'
import Select from './Select'
import '../style/index.css'
import TableHeader from './TableHeader'
import useFilterDatas from './hooks/useFilterDatas'
import useGetDatasToDisplay from './hooks/useGetDatasToDisplay'
import useRows from './hooks/useRows'
import useTotalPages from './hooks/useTotalPages'
import { getKeys } from '../utility/helpers'

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({
  headers,
  datas,
  defaultItemsByPage = 20,
  itemsByPage = [5, 20, 50],
  scroll = true,
  defaultSort,
  sort = true,
  search = true,
}) {
  const observer = useRef()
  const [searchInput, setSearchInput] = useState('')
  const [nbrItemsByPage, setNbrItemsByPage] = useState(defaultItemsByPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState({ propriety: '', direction: 1 })
  const filteredDatas = useFilterDatas(datas, sorting, searchInput, headers)
  const totalPage = useTotalPages(filteredDatas, nbrItemsByPage)
  const displayedDatas = useGetDatasToDisplay(
    nbrItemsByPage,
    currentPage,
    filteredDatas,
    scroll
  )

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      handleNextPage()
    }
  }

  const lastItemRef = useCallback(
    (node) => {
      console.log(1)
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(handleObserver)
      if (node) observer.current.observe(node)
    },
    [displayedDatas]
  )

  const rows = useRows(displayedDatas, headers, lastItemRef)

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys(headers)
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

  const handleSort = (e) => {
    if (!sort) return
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
      <button onClick={handleNextPage}>clic</button>
      <div className="table__navigation">
        {!scroll && (
          <>
            <div className="table__select">
              <label htmlFor="itemsByPage">Items by page:</label>
              <Select
                choicesArray={itemsByPage}
                onChoice={handleSelect}
                name="itemsByPage"
              />
            </div>
            <Navigation
              onNextPage={handleNextPage}
              onPrecPage={handlePrecPage}
              currentPage={currentPage}
              totalPage={totalPage}
              onCustomPage={handleCustomPage}
            />
          </>
        )}

        <div className="table__search">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
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

export default Table
