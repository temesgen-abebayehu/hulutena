import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'am'
    );

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const setLanguageAndSave = (lang) => {
        setLanguage(lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndSave, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
