import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({ headers, datas }) {
  const [searchInput, setSearchInput] = useState('')
  const [filteredDatas, setFilteredDatas] = useState(datas)
  const [currDatas, setCurrDatas] = useState(datas)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [nbrItemsByPage, setNbrItemsByPage] = useState(5)
  const [rows, setRows] = useState()
  const [sorting, setSorting] = useState({ propriety: '', direction: 1 })

  useEffect(() => {
    setFilteredDatas(sortDatas())
  }, [sorting])

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        const keys = getKeys()
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const element = data[key]
          if (element?.includes(searchInput)) return true
        }
        return false
      })
      setFilteredDatas(newFilteredDatas)
    }
  }, [searchInput])

  useEffect(() => {
    setCurrDatas(paginate())
  }, [currentPage, nbrItemsByPage, filteredDatas])

  useEffect(() => {
    setRows(rowsDOM())
  }, [currDatas])

  useEffect(() => {
    setTotalPage(getNbrTotPages())
  }, [nbrItemsByPage, filteredDatas])

  const getKeys = () => {
    return Object.keys(headers).filter((key) => key !== 'id')
  }

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys()
    return keys.map((key) => {
      return (
        <th key={key} data-sort={key} onClick={handleSort}>
          {headers[key]}
        </th>
      )
    })
  }

  const rowsDOM = () => {
    const keys = getKeys()
    return currDatas.map((data) => {
      return <tr key={data.id}>{getCells(keys, data)}</tr>
    })
  }

  const getCells = (keys, data) => {
    return keys.map((key) => {
      return <td key={data.id + key}>{data[key]}</td>
    })
  }

  // Pages start at 'page 1'
  const paginate = () => {
    const start = nbrItemsByPage * (currentPage - 1)
    const end = nbrItemsByPage * currentPage
    return filteredDatas.slice(start, end)
  }

  const getNbrTotPages = () => {
    const nbrFullPage = Math.floor(filteredDatas.length / nbrItemsByPage)
    const partialPage = filteredDatas.length % nbrItemsByPage
    return partialPage ? nbrFullPage + 1 : nbrFullPage
  }

  const sortDatas = () => {
    if (sorting.propriety.length === 0) return
    const sortedDatas = [...filteredDatas].sort((a, b) => {
      return a[sorting.propriety] > b[sorting.propriety]
        ? -1 * sorting.direction
        : 1 * sorting.direction
    })
    return sortedDatas
  }

  const handleSort = (e) => {
    const newSorting = { ...sorting }
    newSorting.direction =
      sorting.propriety === e.target.dataset.sort ? sorting.direction * -1 : 1
    newSorting.propriety = e.target.dataset.sort
    setSorting(newSorting)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePrecPage = () => {
    setCurrentPage(currentPage - 1)
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
    <div>
      <label htmlFor="itemsByPage">Items by page:</label>
      <select name="itemsByPage" id="itemsByPage" onChange={handleSelect}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <label htmlFor="search">Search</label>
      <input
        type="text"
        name="search"
        id="search"
        value={searchInput}
        onChange={handleSearch}
      />
      <div className="table">
        <table className="blueTable">
          {headers && (
            <thead>
              <tr>{headersDOM()}</tr>
            </thead>
          )}
          <tfoot>
            <tr>
              <td colSpan="3">{filteredDatas.length} entries</td>
              <td colSpan="3"></td>
              <td colSpan="3">
                <Navigation
                  onNextPage={handleNextPage}
                  onPrecPage={handlePrecPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onCustomPage={handleCustomPage}
                />
              </td>
            </tr>
          </tfoot>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
