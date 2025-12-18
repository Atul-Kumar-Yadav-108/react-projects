import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <div className="d-flex ms-3 mb-3">
      <input
        className="form-control me-2 flex-grow-1"
        type="search"
        placeholder="Search appointments"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
