import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

const LanguageToggleButton = () => {
    const { setLanguage } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full hover:bg-gray-200"
            >
                <FaGlobe size={24} />
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        English
                    </button>
                    <button
                        onClick={() => handleLanguageChange('am')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Amharic
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageToggleButton;
