import { useState, useEffect } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Navigation({
  onNextPage,
  onPrecPage,
  currentPage,
  totalPage,
  onCustomPage
}) {
  const [pages, setPages] = useState();
  useEffect(() => {
    setPages(buildPages());
  }, [totalPage, currentPage]);
  const buildPages = () => {
    let pagesArray = [];
    for (let i = 1; i <= totalPage; i++) {
      pagesArray.push( /*#__PURE__*/_jsx("button", {
        className: i === currentPage ? 'pages--active pages' : 'pages',
        onClick: () => onCustomPage(i),
        children: i
      }, i));
    }
    return pagesArray;
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "table-nav",
    children: [/*#__PURE__*/_jsxs("button", {
      onClick: onPrecPage,
      children: [" ", '<']
    }), pages, /*#__PURE__*/_jsxs("button", {
      onClick: onNextPage,
      children: [" ", '>']
    })]
  });
}
export default Navigation;