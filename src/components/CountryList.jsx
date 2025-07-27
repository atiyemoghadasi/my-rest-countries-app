import CountryCard from './CountryCard';

const CountryList = ({ countries, darkMode, onCountryClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-14 px-10 md:px-0 lg:px-0">
            {countries.length > 0 ? (
                countries.map((country) => (
                    <CountryCard
                        key={country.alpha3Code}
                        country={country}
                        darkMode={darkMode}
                        onCountryClick={onCountryClick}
                    />
                ))
            ) : (
                <p className={`col-span-full text-center ${darkMode ? 'text-gray-400' : 'text-[hsl(0,0%,52%)]'}`}>
                    No countries found matching your criteria.
                </p>
            )}
        </div>
    );
};

export default CountryList;
