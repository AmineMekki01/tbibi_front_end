import React, { useState } from 'react';

import { Users } from './users';

import DoctorCard from '../Users/Doctor/DoctorCard';
import { AppContainer, SearchInputContainer, SearchInput, UserList } from './SearchBar.styles';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${query}, Specialty: ${specialty}, Location: ${location}`);
  };

  return (
    <AppContainer className="app mt-6">
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Search by Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Search by Specialty..."
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Search by Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </SearchInputContainer>
      { (query || specialty || location) && (
        <UserList className='flex flex-wrap justify-center'>
          {Users.filter((user) => 
            (user.first_name || '').toLowerCase().startsWith(query.toLowerCase()) &&
            (user.specialty || '').toLowerCase().startsWith(specialty.toLowerCase()) &&
            (user.location || '').toLowerCase().includes(location.toLowerCase())
          ).map((user) => {
            return (
              <li>
                <DoctorCard
                  first_name={user.first_name} 
                  last_name={user.last_name} 
                  specialty={user.specialty} 
                  years_experience={user.years_of_experience} 
                  doctor_rating={user.rating} 
                  location={user.location}
                  imageUrl={user.image_url}
                  doctor_user_name={user.doctor_user_name}
                />

  
              </li>
            );
          })}
        </UserList>
      )}
    </AppContainer>
  );
};

export default SearchBar;
