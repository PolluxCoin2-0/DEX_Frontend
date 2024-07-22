import { useState, useEffect, useRef } from 'react';
import { getSearchedData } from '../utils/Axios';
import { TimeFormatting } from '../utils/TimeFormatting';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const handleInputChange = async(e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const searchedData = await getSearchedData(value, 1);
      setSuggestions(searchedData?.data?.swapTransaction);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative mx-auto text-gray-600 mb-6 w-full">
      <form onSubmit={handleSubmit} className="pt-2">
        <input
          className="shadow-md bg-[#F3BB1B] px-5 py-3 pr-16 rounded-lg text-sm focus:outline-none w-full text-white placeholder:text-white"
          type="search"
          name="search"
          placeholder="Enter a name or paste the address to search for a PoxSwap trading pair"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="absolute right-2 top-1 mt-5 mr-4">
          <svg
            className="text-white h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: "new 0 0 56.966 56.966" }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </form>
      {suggestions.length > 0 && (
  <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-10 shadow-lg">
   {suggestions.map((suggestion, index) => (
  <li
    key={index}
    className="px-4 py-2 cursor-pointer border-b last:border-none border-gray-300 hover:bg-gray-100 sm:px-6 md:px-8 lg:px-10"
  >
    <Link to={`https://poxscan.io/transactions-detail/${suggestion?.trxId}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center truncate">
        <span className="font-medium text-gray-800 text-sm sm:text-base md:text-lg ">
          <span className='bg-gray-200 rounded p-1 '>Transaction ID:</span> {suggestion?.trxId}
        </span>
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm md:text-base mt-2 sm:mt-0">
          {suggestion?.createdAt && TimeFormatting(suggestion?.createdAt)}
        </span>
      </div>
    </Link>
  </li>
))}
  </ul>
)}

    </div>
  );
};

export default Search;
