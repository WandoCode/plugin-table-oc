import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import '../style/index.css';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const getKeys = headers => {
  return Object.keys(headers).filter(key => key !== 'id');
};
const rowsDOM = (datas, headers) => {
  const keys = getKeys(headers);
  return datas.map(data => {
    return /*#__PURE__*/_jsx("tr", {
      children: getCells(keys, data)
    }, data.id);
  });
};
const getCells = (keys, data) => {
  return keys.map(key => {
    return /*#__PURE__*/_jsx("td", {
      children: data[key]
    }, data.id + key);
  });
};

// Pages start at 'page 1'
const paginate = (nbrItemsByPage, currentPage, datas) => {
  const start = nbrItemsByPage * (currentPage - 1);
  const end = nbrItemsByPage * currentPage;
  return datas.slice(start, end);
};
const getNbrTotPages = (datas, nbrItemsByPage) => {
  const nbrFullPage = Math.floor(datas.length / nbrItemsByPage);
  const partialPage = datas.length % nbrItemsByPage;
  return partialPage ? nbrFullPage + 1 : nbrFullPage;
};
const sortDatas = ({
  propriety,
  direction
}, datas) => {
  if (propriety.length === 0) return;
  const sortedDatas = [...datas].sort((a, b) => {
    return a[propriety] > b[propriety] ? -1 * direction : 1 * direction;
  });
  return sortedDatas;
};

// Il faut fournir un objet pour le nom des colonnes
// Datas est un array d'objet. Chaque objet a un id unique.
// Les champs des objets datas sont des strings
function Table({
  headers,
  datas
}) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredDatas, setFilteredDatas] = useState(datas);
  const [displayedDatas, setDisplayedDatas] = useState(datas);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [nbrItemsByPage, setNbrItemsByPage] = useState(5);
  const [rows, setRows] = useState();
  const [sorting, setSorting] = useState({
    propriety: '',
    direction: 1
  });
  useEffect(() => {
    setFilteredDatas(sortDatas(sorting, filteredDatas));
  }, [sorting, filteredDatas]);
  useEffect(() => {
    if (searchInput.length === 0) setFilteredDatas(datas);else {
      const newFilteredDatas = datas.filter(data => {
        const keys = getKeys(headers);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const element = data[key];
          if (element?.includes(searchInput)) return true;
        }
        return false;
      });
      setFilteredDatas(newFilteredDatas);
    }
  }, [searchInput, datas, headers]);
  useEffect(() => {
    setDisplayedDatas(paginate(nbrItemsByPage, currentPage, filteredDatas));
  }, [currentPage, nbrItemsByPage, filteredDatas]);
  useEffect(() => {
    setRows(rowsDOM(displayedDatas, headers));
  }, [displayedDatas, headers]);
  useEffect(() => {
    setTotalPage(getNbrTotPages(filteredDatas, nbrItemsByPage));
  }, [nbrItemsByPage, filteredDatas]);
  const headersDOM = () => {
    if (!headers) return;
    const keys = getKeys(headers);
    return keys.map(key => {
      return /*#__PURE__*/_jsx("th", {
        "data-sort": key,
        onClick: handleSort,
        children: headers[key]
      }, key);
    });
  };
  const handleSort = e => {
    const newSorting = {
      ...sorting
    };
    newSorting.direction = sorting.propriety === e.target.dataset.sort ? sorting.direction * -1 : 1;
    newSorting.propriety = e.target.dataset.sort;
    setSorting(newSorting);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrecPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleSelect = e => {
    setNbrItemsByPage(e.target.value);
  };
  const handleSearch = e => {
    setSearchInput(e.target.value);
  };
  const handleCustomPage = page => {
    setCurrentPage(page);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: "itemsByPage",
      children: "Items by page:"
    }), /*#__PURE__*/_jsxs("select", {
      name: "itemsByPage",
      id: "itemsByPage",
      onChange: handleSelect,
      children: [/*#__PURE__*/_jsx("option", {
        value: "5",
        children: "5"
      }), /*#__PURE__*/_jsx("option", {
        value: "10",
        children: "10"
      }), /*#__PURE__*/_jsx("option", {
        value: "20",
        children: "20"
      })]
    }), /*#__PURE__*/_jsx("label", {
      htmlFor: "search",
      children: "Search"
    }), /*#__PURE__*/_jsx("input", {
      type: "text",
      name: "search",
      id: "search",
      value: searchInput,
      onChange: handleSearch
    }), /*#__PURE__*/_jsx("div", {
      className: "table",
      children: /*#__PURE__*/_jsxs("table", {
        className: "blueTable",
        children: [headers && /*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsx("tr", {
            children: headersDOM()
          })
        }), /*#__PURE__*/_jsx("tfoot", {
          children: /*#__PURE__*/_jsxs("tr", {
            children: [/*#__PURE__*/_jsxs("td", {
              colSpan: "3",
              children: [filteredDatas.length, " entries"]
            }), /*#__PURE__*/_jsx("td", {
              colSpan: "3"
            }), /*#__PURE__*/_jsx("td", {
              colSpan: "3",
              children: /*#__PURE__*/_jsx(Navigation, {
                onNextPage: handleNextPage,
                onPrecPage: handlePrecPage,
                currentPage: currentPage,
                totalPage: totalPage,
                onCustomPage: handleCustomPage
              })
            })]
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: rows
        })]
      })
    })]
  });
}
export default Table;