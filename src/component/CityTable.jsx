import { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom'
import Loading from "./Loading";

function CityTable() {

  const [cityData, setCityData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setISSorted] = useState(false);
  const limit = 20;

  // it is responsible for conditionally rendering while changes happens on any dependencies 
  useEffect(() => {
    fetchData();
    console.log(offset);
  }, [offset, isSorted, setISSorted, Loading]);

  // Fetching data from API
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offset}`)
      if (!response.ok) {
        throw new Error("Networ Error");
      }
      const data = await response.json();
      setCityData(prevCities => [...prevCities, ...data.results]);
      setIsLoading(false)
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }

  }

  // Infinite Scroll 
  const handleScroll = () => {
    // Check if user has scrolled to the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setOffset(prevOffset => prevOffset + limit); // Increment offset

    }
  };

  // listen scroll event and aplly scroll func.  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <Loading />
  return (
    <div className="flex flex-col justify-center items-center ">
      {/* Heading */}

      <h3 className="text-center text-3xl font-semibold">List of cities</h3>
      {/* Toggle Sort  */}

      <div className="px-2 py-1 flex items-center justify-left gap-3 font-semibold text-slate-600 mt-6  hover:text-slate-700">
        <label className="cursor-pointer" htmlFor="sorting">Sort By City</label>
        <input className="cursor-pointer hover:border-2 bg-black" type="checkbox" defaultChecked={isSorted} id="sorting" onChange={() => setISSorted(!isSorted)} />
      </div>
      {cityData && <div className="flex flex-col justify-center items-center">
        <table className=" border-2  mt-8 w-full ">
          <thead className="border-2 sticky top-0 z-10 bg-slate-600 text-white">
            <tr className="border-2 text-left ">
              <th className="border-2 px-4 py-1 text-lg ">City Name</th>
              <th className="border-2 px-4 py-1 text-lg">Country</th>
              <th className="border-2 px-4 py-1 text-lg">Time Zone</th>
            </tr>
          </thead>
          <tbody>
            {
              isSorted ? cityData.sort((a, b) => a.name.localeCompare(b.name)).map((item, idx) => (
                <tr key={idx} >
                  <td className="border-2 px-4 py-1 hover:underline"><Link to={`/weather?lat=${item.coordinates.lat}&lon=${item.coordinates.lon}`}  >
                    {item.name}
                  </Link></td>
                  <td className="border-2 px-4 py-1">{item.cou_name_en}</td>
                  <td className="border-2 px-4 py-1 max-w-32 overflow-hidden">{item.timezone}</td>
                </tr>
              )) : cityData.map((item, idx) => (
                <tr key={idx} >
                  <td className="border-2 px-4 py-1 hover:underline hover:text-black"><Link to={`/weather?lat=${item.coordinates.lat}&lon=${item.coordinates.lon}`} target="_blank"  >
                    {item.name}
                  </Link></td>
                  <td className="border-2 px-4 py-1">{item.cou_name_en}</td>
                  <td className="border-2 px-4 py-1 max-w-32 overflow-hidden">{item.timezone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default CityTable;