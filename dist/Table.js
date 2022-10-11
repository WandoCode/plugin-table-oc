import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Table({
  headers,
  datas
}) {
  const headersDOM = () => {
    if (!headers) return;
    const keys = Object.keys(headers);
    return keys.map(header => {
      return /*#__PURE__*/_jsx("th", {
        children: headers[header]
      }, header);
    });
  };
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx("div", {
      className: "table",
      children: /*#__PURE__*/_jsxs("table", {
        className: "blueTable",
        children: [headers && /*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsx("tr", {
            children: headersDOM()
          })
        }), /*#__PURE__*/_jsx("tfoot", {
          children: /*#__PURE__*/_jsx("tr", {
            children: /*#__PURE__*/_jsx("td", {
              colSpan: "9",
              children: /*#__PURE__*/_jsx("div", {
                className: "links"
              })
            })
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: /*#__PURE__*/_jsxs("tr", {
            children: [/*#__PURE__*/_jsx("td", {
              children: "cell1_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell2_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell3_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell4_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell5_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell6_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell7_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell8_1"
            }), /*#__PURE__*/_jsx("td", {
              children: "cell9_1"
            })]
          })
        })]
      })
    })
  });
}
export default Table;