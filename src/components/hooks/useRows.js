import { useState, useEffect } from 'react'
import { getKeys } from '../../utility/helpers'

const getCells = (keys, data) => {
  return keys.map((key) => {
    return <td key={data.id + key}>{data[key]}</td>
  })
}
const rowsDOM = (datas, headers, lastItemRef) => {
  const keys = getKeys(headers)
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

function useRows(displayedDatas, headers, lastItemRef) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(rowsDOM(displayedDatas, headers, lastItemRef))
  }, [displayedDatas, headers])

  return rows
}

export default useRows