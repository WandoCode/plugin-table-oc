import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import Select from './Select'
import '../style/index.css'

const getKeys = (headers) => {
  return Object.keys(headers).filter((key) => key !== 'id')
}

const rowsDOM = (datas, headers) => {
  const keys = getKeys(headers)
  return datas.map((data) => {
    return <tr key={data.id}>{getCells(keys, data)}</tr>
  })
}

const getCells = (keys, data) => {
  return keys.map((key) => {
    return <td key={data.id + key}>{data[key]}</td>
  })
}

// Pages start at 'page 1'
const paginate = (nbrItemsByPage, currentPage, datas) => {
  const start = nbrItemsByPage * (currentPage - 1)
  const end = nbrItemsByPage * currentPage
  return datas.slice(start, end)
}

const getNbrTotPages = (datas, nbrItemsByPage) => {
  const nbrFullPage = Math.floor(datas.length / nbrItemsByPage)
  const partialPage = datas.length % nbrItemsByPage
  return partialPage ? nbrFullPage + 1 : nbrFullPage
}

const sortDatas = ({ propriety, direction }, datas) => {
  if (propriety.length === 0) return
  const sortedDatas = [...datas].sort((a, b) => {
    return a[propriety] > b[propriety] ? -1 * direction : 1 * direction
  })
  return sortedDatas
}

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({ headers, datas }) {
  const [searchInput, setSearchInput] = useState('')
  const [nbrItemsByPage, setNbrItemsByPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [sorting, setSorting] = useState({ propriety: '', direction: 1 })
  const [filteredDatas, setFilteredDatas] = useState(datas)
  const [displayedDatas, setDisplayedDatas] = useState(datas)
  const [rows, setRows] = useState()

  useEffect(() => {
    setFilteredDatas(sortDatas(sorting, filteredDatas))
  }, [sorting])

  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas)
    else {
      const newFilteredDatas = datas.filter((data) => {
        const keys = getKeys(headers)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const element = data[key]
          if (element?.includes(searchInput)) return true
        }
        return false
      })
      setFilteredDatas(newFilteredDatas)
    }
  }, [searchInput, datas, headers])

  useEffect(() => {
    setDisplayedDatas(paginate(nbrItemsByPage, currentPage, filteredDatas))
  }, [currentPage, nbrItemsByPage, filteredDatas])

  useEffect(() => {
    setRows(rowsDOM(displayedDatas, headers))
  }, [displayedDatas, headers])

  useEffect(() => {
    setTotalPage(getNbrTotPages(filteredDatas, nbrItemsByPage))
  }, [nbrItemsByPage, filteredDatas])

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys(headers)
    return keys.map((key) => {
      return (
        <th key={key} data-sort={key} onClick={handleSort}>
          {headers[key]}
        </th>
      )
    })
  }

  const handleSort = (e) => {
    const newSorting = { ...sorting }
    newSorting.direction =
      sorting.propriety === e.target.dataset.sort ? sorting.direction * -1 : 1
    newSorting.propriety = e.target.dataset.sort
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
            choicesArray={[5, 10, 20]}
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
        <table className="blueTable">
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
