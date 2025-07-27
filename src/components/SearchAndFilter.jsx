import { useState, useEffect, useRef } from 'react';

const SearchAndFilter = ({
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    uniqueRegions,
    darkMode
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3 lg:w-[480px]">
                <svg className={`absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-200' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    className={`outline-none pl-20 pr-4 py-4 text-sm rounded-md shadow w-full ${darkMode ? 'bg-[hsl(209,23%,22%)] text-gray-50 placeholder:text-gray-400' : 'bg-white text-[hsl(0,0%,52%)] placeholder:font-semibold placeholder:text-gray-400'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Region Filter - Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className={`flex justify-between items-center cursor-pointer p-4 rounded-md shadow w-56 md:w-[200px] ${darkMode ? 'bg-[hsl(209,23%,22%)] text-gray-100' : 'bg-white text-gray-900'}`}
                >
                    <span className='px-2 text-sm'>Filter by Region</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                    <ul
                        className={`absolute z-10 top-full py-3 px-2 mt-1 w-56 md:w-full rounded-md shadow-lg ${darkMode ? 'bg-[hsl(209,23%,22%)]' : 'bg-white'}`}
                    >
                        {uniqueRegions.map(region => (
                            <li
                                key={region}
                                onClick={() => handleRegionSelect(region)}
                                className={`text-sm px-4 py-1 cursor-pointer ${darkMode ? 'hover:bg-[hsl(209,23%,26%)]' : 'hover:bg-[hsl(0,0%,95%)]'} ${selectedRegion === region ? 'font-semibold' : ''}`}
                            >
                                {region}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchAndFilter;
