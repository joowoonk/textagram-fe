import React, { useState } from "react";

const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [loading, setLoading] = useState(true);

  // while (loading) {
  // for (let i = 1; 1 <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }
  //   setLoading(false);
  // }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li key={page} className="page-item">
            <a onClick={() => paginate(page)} href="#" className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginations;
