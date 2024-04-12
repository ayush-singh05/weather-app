import React from 'react'
import { Link } from 'react-router-dom'

function SearchResult({result = []}) {
    
  return (
    <div className=' bg-white max-h-80 overflow-x-auto  my-4 rounded-md shadow-xl'>
        {
            result && result.map((item,idx) => (
                <Link key={idx} className='w-full h-full' to={`/weather?lat=${item.coordinates.lat}&lon=${item.coordinates.lon}`} target="_blank"  >
                 <div className='py-1 px-2 hover:bg-slate-300 rounded '>
                    {item.name}
                 </div>
              </Link>
            ))
        }
       
    </div>
  )
}

export default SearchResult