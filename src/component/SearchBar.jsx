import React, { useState } from 'react'
import SearchResult from './SearchResult';

function SearchBar({result = []}) {

    const [inputQuery,setInputQuery] = useState('');
    const [listData,setListData] = useState([]);

    const fetchData = (value) => {
        const data = result.filter((city) => {
            return city && city.name && city.name.toLowerCase().includes(value)
        });
        setListData(data)
        console.log(data);
    }

    const handleChange = (value) => {
        setInputQuery(value);
        fetchData(value);
    }
  return (
    <div>
    <div className='max-lg:w-72 w-96 flex border-2 rounded-lg p-1 justify-center items-center bg-white'>
    <svg xmlns="http://www.w3.org/2000/svg"fill='#dddd' height="29" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
    <input type="text"
    className='w-full outline-none h-8 p-2 '
    placeholder='Seach'
    onChange={(e) => handleChange(e.target.value)}
    />
    </div>
    <div>
       { inputQuery && <SearchResult result={listData}/>}
    </div>
    </div>
  )
}

export default SearchBar