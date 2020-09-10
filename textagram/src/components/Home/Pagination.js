import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <Link to={`${number}`}>
            <li key={number} className="page-item">
              <a
                onClick={() => {
                  paginate(number);
                  window.scrollTo(0, 0);
                }}
                className="page-link"
              >
                {number}
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
