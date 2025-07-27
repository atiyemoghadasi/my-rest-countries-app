

const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <header className={`fixed top-0 left-0 w-full z-50 shadow py-6 px-4 md:px-20 ${darkMode ? 'bg-[hsl(209,23%,22%)]' : 'bg-[hsl(0,0%,98%)]'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-md md:text-2xl font-extrabold" style={darkMode ? { color: 'hsl(0,0%,100%)' } : {}}>Where in the world?</h1>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center space-x-2 p-2 text-sm md:text-base rounded-md cursor-pointer dark:transition-colors duration-200 hover:scale-105"
                >
                    <svg className={`w-5 h-5 ${darkMode ? 'text-gray-100' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {darkMode ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                        )}
                    </svg>
                    <span className={`font-semibold ${darkMode ? 'text-gray-100' : ''}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
