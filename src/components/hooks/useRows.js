import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'

const getCells = (keys, data) => {
  return keys.map((key) => {
    return <td key={data.id + key}>{data[key]}</td>
  })
}
const rowsDOM = (datas, headers) => {
  const keys = getKeys(headers)
  return datas.map((data) => {
    return <tr key={data.id}>{getCells(keys, data)}</tr>
  })
}

function useRows(displayedDatas, headers) {
  const [rows, setRows] = useState()

  useEffect(() => {
    setRows(rowsDOM(displayedDatas, headers))
  }, [displayedDatas, headers])
  return rows
}

export default useRows
