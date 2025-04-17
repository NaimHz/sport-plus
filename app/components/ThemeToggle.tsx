import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme, colors } = useTheme();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: withSpring(theme === 'dark' ? '0deg' : '180deg') }
            ],
        };
    });

    return (
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
            <Animated.View style={[styles.iconContainer, animatedStyle]}>
                <Ionicons
                    name={theme === 'dark' ? 'sunny' : 'moon'}
                    size={24}
                    color={colors.text.primary}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 20,
    } as ViewStyle,
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
});
