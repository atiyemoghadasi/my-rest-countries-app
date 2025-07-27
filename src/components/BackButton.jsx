
const BackButton = ({ darkMode, onBackClick }) => {
    return (
        <button
            onClick={onBackClick}
            className={`flex items-center space-x-2 py-2 px-6 lg:px-8 cursor-pointer rounded shadow-[0_0_5px_rgba(0,0,0,0.3)] mt-8 lg:mt-16 mb-16 lg:mb-20 ${darkMode ? 'bg-[hsl(209,23%,22%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(209,23%,24%)]' : 'bg-[hsl(0,0%,100%)] text-[hsl(200,15%,8%)] hover:bg-[hsl(0,0%,97%)]'}`}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>Back</span>
        </button>
    );
};

export default BackButton;
