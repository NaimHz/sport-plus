import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, {
    useAnimatedStyle,
    withTiming,
    withSpring,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

interface TimerCircleProps {
    timeLeft: number;
    totalTime: number;
    children: React.ReactNode;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({ timeLeft, totalTime, children }) => {
    const { colors } = useTheme();
    const progress = timeLeft / totalTime;

    const progressStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(progress, { damping: 15 }) }
            ],
            opacity: withTiming(progress, { duration: 500 }),
        };
    });

    const textStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            progress,
            [0, 0.5, 1],
            [1.2, 1, 1.2],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale: withSpring(scale, { damping: 15 }) }],
        };
    });

    return (
        <View style={styles.container}>
            <View style={[styles.circle, { borderColor: colors.primary }]}>
                <Animated.View
                    style={[
                        styles.progress,
                        { backgroundColor: colors.primary },
                        progressStyle
                    ]}
                />
                <Animated.View style={[styles.content, textStyle]}>
                    {children}
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    } as ViewStyle,
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    } as ViewStyle,
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
    } as ViewStyle,
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
});
