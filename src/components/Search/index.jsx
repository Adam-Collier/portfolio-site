import React from 'react';
import { Search } from 'react-feather';

import s from './search.module.css';

const Index = ({ allData, setState, name }) => {
  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredData = allData.filter((data) => {
      if (
        data.title.toLowerCase().includes(searchValue) ||
        data.content.toLowerCase().includes(searchValue)
      )
        return data;

      return false;
    });

    setState(filteredData);
  };

  return (
    <div className={s.search}>
      <Search size={16} />
      <input
        type="search"
        name={`search ${name}`}
        id="search"
        onChange={handleChange}
        aria-label={`search ${name}`}
      />
    </div>
  );
};

export default Index;
