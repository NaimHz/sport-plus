import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Exercise } from '../types';
import Animated, {
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    useSharedValue,
    withSequence,
    withDelay
} from 'react-native-reanimated';

interface ExerciseCardProps {
    exercise: Exercise;
    index: number;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
    const { colors } = useTheme();
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        scale.value = withSequence(
            withDelay(index * 100, withSpring(1, { damping: 8 })),
            withSpring(1.02, { damping: 8 }),
            withSpring(1, { damping: 8 })
        );
        opacity.value = withDelay(index * 100, withSpring(1));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Link
            href={`/exercise/${exercise.id}`}
            asChild
        >
            <TouchableOpacity>
                <Animated.View style={[
                    styles.card,
                    { backgroundColor: colors.card },
                    animatedStyle
                ]}>
                    <View style={styles.header}>
                        <Text style={[styles.name, { color: colors.text.primary }]}>
                            {exercise.name}
                        </Text>
                        <View style={styles.difficultyContainer}>
                            <Text style={[styles.difficultyText, { color: colors.text.secondary }]}>
                                Facile: {exercise.durationPerRep.facile}s
                            </Text>
                            <Text style={[styles.difficultyText, { color: colors.text.secondary }]}>
                                Moyen: {exercise.durationPerRep.moyen}s
                            </Text>
                            <Text style={[styles.difficultyText, { color: colors.text.secondary }]}>
                                Difficile: {exercise.durationPerRep.difficile}s
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.description, { color: colors.text.secondary }]}>
                        {exercise.description}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    } as ViewStyle,
    header: {
        marginBottom: 8,
    } as ViewStyle,
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    } as TextStyle,
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,
    difficultyText: {
        fontSize: 12,
    } as TextStyle,
    description: {
        fontSize: 14,
    } as TextStyle,
});
