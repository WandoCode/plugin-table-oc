import { useState } from 'react'

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({ headers, datas }) {
  const [currDatas, setCurrDatas] = useState(datas)
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
  const paginate = (nbrItemsByPage, pageNbr) => {
    const start = nbrItemsByPage * (pageNbr - 1)
    const end = nbrItemsByPage * pageNbr
    return currDatas.slice(start, end)
  }
  const getNbrTotPages = (nbrItemsByPage) => {
    const nbrFullPage = Math.floor(currDatas.length / nbrItemsByPage)
    const partialPage = currDatas.length % nbrItemsByPage
    return partialPage ? nbrFullPage + 1 : nbrFullPage
  }
  console.log(getNbrTotPages(6))
  return (
    <div>
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
          <tbody>{rowsDOM()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
