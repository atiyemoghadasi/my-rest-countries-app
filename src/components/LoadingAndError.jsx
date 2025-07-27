

const LoadingAndError = ({ loading, error, darkMode }) => {
    const bgColor = darkMode ? 'bg-[hsl(207,26%,17%)]' : 'bg-[hsl(0,0%,98%)]';
    const textColor = darkMode ? 'text-[hsl(0,0%,100%)]' : 'text-[hsl(200,15%,8%)]';

    if (loading) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${bgColor} ${textColor}`}>
                <p>Loading application and country data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${bgColor} ${textColor}`}>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return null;
};

export default LoadingAndError;
