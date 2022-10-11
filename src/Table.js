import { useState, useEffect } from 'react'

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({ headers, datas }) {
  const [currDatas, setCurrDatas] = useState(datas)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [nbrItemsByPage, setNbrItemsByPage] = useState(5)
  const [rows, setRows] = useState()

  useEffect(() => {
    paginate()
  }, [currentPage, nbrItemsByPage])

  useEffect(() => {
    setRows(rowsDOM())
  }, [currDatas])

  useEffect(() => {
    setTotalPage(getNbrTotPages())
  }, [datas, nbrItemsByPage])

  const getKeys = () => {
    return Object.keys(headers).filter((key) => key !== 'id')
  }

  const headersDOM = () => {
    if (!headers) return
    const keys = getKeys()
    return keys.map((key) => {
      return <th key={key}>{headers[key]}</th>
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
    setCurrDatas(datas.slice(start, end))
  }

  const getNbrTotPages = () => {
    const nbrFullPage = Math.floor(currDatas.length / nbrItemsByPage)
    const partialPage = currDatas.length % nbrItemsByPage
    return partialPage ? nbrFullPage + 1 : nbrFullPage
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handleSelect = (e) => {
    console.log(e.target.value)
    setNbrItemsByPage(e.target.value)
  }
  return (
    <div>
      <label htmlFor="itemsByPage">Items by page:</label>
      <select name="itemsByPage" id="itemsByPage" onChange={handleSelect}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <div className="table">
        <table className="blueTable">
          {headers && (
            <thead>
              <tr>{headersDOM()}</tr>
            </thead>
          )}
          <tfoot>
            <tr>
              <td colSpan="9">
                <div className="links">
                  {/* Todo: Footer: mettre pagination; btn next and prev;*/}
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <button onClick={handleNextPage}>Next page</button>
    </div>
  )
}

export default Table
