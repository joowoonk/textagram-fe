import React from "react";
import { useHistory } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const { push } = useHistory();
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <ul
              onClick={() => {
                paginate(number);
                window.scrollTo(0, 0);
                push(`${number}`);
              }}
              className="page-link"
            >
              {number}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
