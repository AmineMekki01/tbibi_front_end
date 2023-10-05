import React, { useState } from 'react';

function SearchDoctors() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Perform API call to search doctors
  };

  return (
    <div>
      <h2>Search Doctors</h2>
      <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchDoctors;
