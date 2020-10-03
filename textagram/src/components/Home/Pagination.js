import React from "react";
import { useHistory } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate, page }) => {
  const pageNumbers = [];
  const { push } = useHistory();
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const copy = [...pageNumbers];

  // pageNumbers[pageNumbers.length - 2] = "...";
  let last = pageNumbers[pageNumbers.length - 1];
  // for (let i = page; i < page + 3; i++) {

  pageNumbers.splice(0, parseInt(page) - 3);

  pageNumbers.splice(parseInt(page) + 3, pageNumbers.length - 3);
  if (parseInt(page) > pageNumbers.length - 2) {
    // pageNumbers.pop();
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          {parseInt(page) > 1 && (
            <ul
              style={{ margin: "0 2px" }}
              onClick={() => {
                paginate(copy[0]);
                window.scrollTo(0, 0);
                push(`${copy[0]}`);
              }}
              className="page-link"
            >
              1..
            </ul>
          )}
        </li>
        {/* {parseInt(page) > 3 && <ul className="page-link">...</ul>} */}
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <ul
                onClick={() => {
                  if (number !== "...") {
                    paginate(number);
                    window.scrollTo(0, 0);
                    push(`${number}`);
                  }
                }}
                className="page-link"
              >
                {number}
              </ul>
            </li>
          );
        })}{" "}
        {/* {parseInt(page) > copy.length - 3 && <ul className="page-link">...</ul>} */}
        <br />
        <li className="page-item">
          {parseInt(page) !== copy.length && (
            <ul
              style={{ margin: "0 2px" }}
              onClick={() => {
                paginate(copy.length);
                window.scrollTo(0, 0);
                push(`${copy.length}`);
              }}
              className="page-link"
            >
              ..{copy.length}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
