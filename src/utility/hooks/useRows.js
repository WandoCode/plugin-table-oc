import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'
import { useSelector } from 'react-redux'

const getCells = (keys, data) => {
  return keys.map((key) => {
    return <td key={data.id + key}>{data[key]}</td>
  })
}

function useRows(datas, lastItemRef) {
  const headers = useSelector((state) => state.table.headers)
  const showId = useSelector((state) => state.table.showId)

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(rowsDOM())
  }, [datas, headers])

  const rowsDOM = () => {
    const keys = getKeys(headers, showId)
    return datas.map((data, index) => {
      if (datas.length === index + 1)
        return (
          <tr key={data.id} ref={lastItemRef}>
            {getCells(keys, data)}
          </tr>
        )
      else return <tr key={data.id}>{getCells(keys, data)}</tr>
    })
  }

  return rows
}

export default useRows
