function Table({ headers, datas }) {
  const headersDOM = () => {
    if (!headers) return
    const keys = Object.keys(headers)
    return keys.map((header) => {
      return <th key={header}>{headers[header]}</th>
    })
  }

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
          <tbody>
            <tr>
              <td>cell1_1</td>
              <td>cell2_1</td>
              <td>cell3_1</td>
              <td>cell4_1</td>
              <td>cell5_1</td>
              <td>cell6_1</td>
              <td>cell7_1</td>
              <td>cell8_1</td>
              <td>cell9_1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
