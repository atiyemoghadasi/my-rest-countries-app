import { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import LoadingAndError from './components/LoadingAndError';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function App() {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const [userId, setUserId] = useState(null);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountryAlpha3Code, setSelectedCountryAlpha3Code] = useState(null); // State for selected country

    // Firebase Initialization
    useEffect(() => {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

        let app;
        if (!getApps().length) {
            if (Object.keys(firebaseConfig).length > 0) {
                app = initializeApp(firebaseConfig);
            } else {
                console.warn("Firebase config not found. Running without Firebase features.");
                setFirebaseInitialized(true);
                setUserId(crypto.randomUUID());
                return;
            }
        } else {
            app = getApp();
        }

        const auth = getAuth(app);
        const db = getFirestore(app);

        const signIn = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined') {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Firebase authentication error:", error);
            }
        };

        signIn();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(crypto.randomUUID());
            }
            setFirebaseInitialized(true);
        });

        return () => unsubscribe();
    }, []);

    // Fetch countries data from data.json
    useEffect(() => {
        const loadCountries = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to load countries data:", e);
            } finally {
                setLoading(false);
            }
        };

        if (firebaseInitialized) {
            loadCountries();
        }
    }, [firebaseInitialized]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);


    const uniqueRegions = useMemo(() => {
        const regions = new Set();
        countries.forEach(country => {
            if (country.region) {
                regions.add(country.region);
            }
        });
        return Array.from(regions).sort();
    }, [countries]);

    // Filtered countries based on search term and selected region
    const filteredCountries = useMemo(() => {
        let filtered = countries;
        if (searchTerm) {
            filtered = filtered.filter(country =>
                country.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedRegion) {
            filtered = filtered.filter(country =>
                country.region && country.region.toLowerCase() === selectedRegion.toLowerCase()
            );
        }
        return filtered;
    }, [countries, searchTerm, selectedRegion]);

    // Find the selected country for the detail page
    const selectedCountry = useMemo(() => {
        if (!selectedCountryAlpha3Code) return null;
        return countries.find(country => country.alpha3Code === selectedCountryAlpha3Code);
    }, [countries, selectedCountryAlpha3Code]);

    const handleCountryClick = (alpha3Code) => {
        setSelectedCountryAlpha3Code(alpha3Code);
    };

    const handleBackClick = () => {
        setSelectedCountryAlpha3Code(null);
    };

    if (!firebaseInitialized || loading || error) {
        return <LoadingAndError loading={loading} error={error} darkMode={darkMode} />;
    }

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-[hsl(207,26%,17%)] text-[hsl(0,0%,100%)]' : 'bg-[hsl(0,0%,98%)] text-[hsl(200,15%,8%)]'}`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="container mx-auto py-8 px-4 md:px-20 mt-20 max-w-[1440px]">
                {selectedCountry ? (
                    <CountryDetail
                        country={selectedCountry}
                        countries={countries}
                        darkMode={darkMode}
                        onBackClick={handleBackClick}
                        onBorderCountryClick={handleCountryClick}
                    />
                ) : (
                    <>
                        <SearchAndFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedRegion={selectedRegion}
                            setSelectedRegion={setSelectedRegion}
                            uniqueRegions={uniqueRegions}
                            darkMode={darkMode}
                        />
                        <CountryList
                            countries={filteredCountries}
                            darkMode={darkMode}
                            onCountryClick={handleCountryClick}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
