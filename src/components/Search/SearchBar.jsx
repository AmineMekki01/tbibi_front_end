import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DoctorCard from '../Users/Doctor/DoctorCard';
import { AppContainer, SearchInputContainer, SearchInput, UserList } from './SearchBar.styles';

const SearchBar = () => {

  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const fetchUsers = async () => {
    try {
      let url = 'http://localhost:3001/api/v1/doctors';
      if (query || specialty || location) {
        url += `?query=${query}&specialty=${specialty}&location=${location}`;
      }
      const response = await axios.get(url);
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [query, specialty, location]);

  const handleButtonClick = () => {
    setButtonClicked(true);
    fetchUsers();
  };

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
        {users.filter((user) => 
          (user.first_name || '').toLowerCase().startsWith(query.toLowerCase()) &&
          (user.specialty || '').toLowerCase().startsWith(specialty.toLowerCase()) &&
          (user.location || '').toLowerCase().includes(location.toLowerCase())
        ).map((user) => {
          return (
            <li>
              <DoctorCard
                doctorId={user.doctor_id}
                first_name={user.first_name} 
                last_name={user.last_name} 
                specialty={user.specialty} 
                years_experience={user.experience_years} 
                doctor_rating={user.rating_average} 
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
