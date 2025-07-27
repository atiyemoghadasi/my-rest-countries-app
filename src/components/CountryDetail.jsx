import BackButton from './BackButton';

const CountryDetail = ({ country, countries, darkMode, onBackClick, onBorderCountryClick }) => {
    // function to find a country by its alpha3Code
    const getCountryNameByAlpha3Code = (alpha3Code) => {
        const foundCountry = countries.find(c => c.alpha3Code === alpha3Code);
        return foundCountry ? foundCountry.name : alpha3Code;
    };

    return (
        <div className="country-detail-page px-4 md:px-0 lg:px-0">
            <BackButton darkMode={darkMode} onBackClick={onBackClick} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-center">
                <div className="flex justify-center md:justify-start">
                    <img
                        src={country.flags.png}
                        alt={`${country.name} flag`}
                        className="w-full md:max-w-md lg:max-w-xl md:h-72 lg:h-96 h-52 shadow-sm object-cover"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/600x400/${darkMode ? '333333' : 'E0E0E0'}/${darkMode ? 'E0E0E0' : '333333'}?text=Flag+Not+Found`;
                        }}
                    />
                </div>
                <div className="country-info">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-4 md:mt-0 mb-6 lg:mb-8">{country.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-20 gap-y-2 mb-8">
                        <div>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Native Name: </span>
                                <span className="font-light"> {country.nativeName || 'N/A'}</span>
                            </p>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Population: </span>
                                <span className="font-light"> {country.population.toLocaleString()}</span>
                            </p>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Region: </span>
                                <span className="font-light"> {country.region}</span>
                            </p>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Sub Region: </span>
                                <span className="font-light"> {country.subregion || 'N/A'}</span>
                            </p>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Capital: </span>
                                <span className="font-light"> {country.capital || 'N/A'}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-base mb-2 mt-8 md:mt-0">
                                <span className="font-semibold ">Top Level Domain: </span>
                                <span className="font-light"> {country.topLevelDomain && country.topLevelDomain.length > 0 ? country.topLevelDomain[0] : 'N/A'}</span>
                            </p>
                            <p className="text-base mb-2">
                                <span className="font-semibold">Currencies: </span>
                                <span className="font-light">
                                    {country.currencies ? (
                                        country.currencies.map(c => c.name).join(', ')
                                    ) : 'N/A'}
                                </span>
                            </p>
                            <p className="text-base">
                                <span className="font-semibold">Languages: </span>
                                <span className="font-light">
                                    {country.languages ? (
                                        country.languages.map(lang => lang.name).join(', ')
                                    ) : 'N/A'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {country.borders && country.borders.length > 0 && (
                        <div className="flex flex-wrap items-center mt-12 lg:mt-16">
                            <span className="font-semibold mr-4 mb-2">Border Countries:</span>
                            {country.borders.map(borderAlpha3Code => (
                                <button
                                    key={borderAlpha3Code}
                                    onClick={() => onBorderCountryClick(borderAlpha3Code)}
                                    className={`font-light py-1 px-4 text-sm rounded shadow-[0_0_5px_rgba(0,0,0,0.3)] mr-2 mb-2 cursor-pointer ${darkMode ? 'bg-[hsl(209,23%,22%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(209,23%,26%)]' : 'bg-[hsl(0,0%,100%)] text-[hsl(200,15%,8%)] hover:bg-[hsl(0,0%,96%)]'}`}
                                >
                                    {getCountryNameByAlpha3Code(borderAlpha3Code)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;
