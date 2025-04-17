import * as React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

const defaultColors = {
    light: {
        primary: '#4a90e2',
        secondary: '#357abd',
        background: '#ffffff',
        card: '#ffffff',
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
    },
    dark: {
        primary: '#1a1a1a',
        secondary: '#2a2a2a',
        background: '#121212',
        card: '#1e1e1e',
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
};

interface ThemeContextType {
    isDark: boolean;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        card: string;
        text: {
            primary: string;
            secondary: string;
        };
    };
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    colors: defaultColors.light,
    toggleTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const colors = isDark ? defaultColors.dark : defaultColors.light;

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
