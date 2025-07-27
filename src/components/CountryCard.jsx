

const CountryCard = ({ country, darkMode, onCountryClick }) => {
    return (
        <div
            key={country.alpha3Code}
            className={`rounded-lg shadow-lg overflow-hidden cursor-pointer pb-4 transition-transform duration-200 hover:scale-[1.03] ${darkMode ? 'bg-[hsl(209,23%,22%)]' : 'bg-white'}`}
            onClick={() => onCountryClick(country.alpha3Code)}
        >
            <img
                src={country.flags.png}
                alt={`${country.name} flag`}
                className="w-full h-40 object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/320x180/${darkMode ? '333333' : 'E0E0E0'}/${darkMode ? 'E0E0E0' : '333333'}?text=Flag+Not+Found`;
                }}
            />
            <div className="p-6">
                <h3 className="font-extrabold text-lg mb-3">{country.name}</h3>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Population: </span>
                    <span className="font-light"> {country.population.toLocaleString()}</span>
                </p>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Region: </span>
                    <span className="font-light"> {country.region}</span>
                </p>
                {country.capital && (
                    <p className="text-sm mb-1">
                        <span className="font-semibold">Capital: </span>
                        <span className="font-light"> {country.capital}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CountryCard;
