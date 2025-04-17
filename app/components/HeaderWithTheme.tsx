import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

function HeaderRight() {
    return <ThemeToggle />;
}

export const HeaderWithTheme: React.FC = () => {
    const { colors } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.card,
                headerRight: () => <HeaderRight />,
            }}
        />
    );
};
