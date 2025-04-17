import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ViewStyle, TextStyle, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../theme';
import { exercises } from '../data/exercises';
import { TimerCircle } from '../components/TimerCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExerciseResult, Difficulty } from '../types';
import { useTimer } from '../hooks/useTimer';

export default function Exercise() {
    const { id } = useLocalSearchParams();
    const { colors, isDark } = useTheme();
    const [exercise, setExercise] = useState(exercises.find(e => e.id === id));
    const [repetitions, setRepetitions] = useState('10');
    const [currentRep, setCurrentRep] = useState(0);
    const [difficulty, setDifficulty] = useState<Difficulty>('moyen');
    const [isRunning, setIsRunning] = useState(false);
    const [currentDuration, setCurrentDuration] = useState(exercise ? exercise.durationPerRep['moyen'] : 0);

    const handleDifficultyChange = (newDifficulty: Difficulty) => {
        setDifficulty(newDifficulty);
        setCurrentRep(0);
        if (exercise) {
            const newDuration = exercise.durationPerRep[newDifficulty];
            setCurrentDuration(newDuration);
            if (isRunning) {
                reset();
                start();
            }
        }
    };

    useEffect(() => {
        if (exercise) {
            setCurrentDuration(exercise.durationPerRep[difficulty]);
        }
    }, [exercise]);

    const { timeLeft, start, stop, reset, playWinSound } = useTimer(currentDuration, () => {
        if (currentRep < parseInt(repetitions) - 1) {
            setCurrentRep(prev => prev + 1);
            reset();
            start();
        } else {
            setIsRunning(false);
            playWinSound();
            const result: ExerciseResult = {
                id: Date.now().toString(),
                exerciseId: exercise!.id,
                exerciseName: exercise!.name,
                duration: currentDuration * parseInt(repetitions),
                repetitions: parseInt(repetitions),
                completedAt: new Date().toISOString(),
                completed: true,
                timeLeft: 0,
                difficulty: difficulty
            };
            // Sauvegarder le résultat
            AsyncStorage.getItem('exerciseResults').then(savedResults => {
                const results = savedResults ? JSON.parse(savedResults) : [];
                results.push(result);
                AsyncStorage.setItem('exerciseResults', JSON.stringify(results));
            }).then(() => {
                // Rediriger vers l'accueil au lieu de l'historique
                router.push('/');
            });
        }
    });

    useEffect(() => {
        if (isRunning) {
            reset(); // Réinitialiser le timer avant de le démarrer
            start();
        } else {
            stop();
        }
    }, [isRunning]);

    const handleAbandon = async () => {
        if (!exercise) return;

        Alert.alert(
            'Abandonner l\'exercice',
            'Êtes-vous sûr de vouloir abandonner cet exercice ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Abandonner',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result: ExerciseResult = {
                                id: Date.now().toString(),
                                exerciseId: exercise.id,
                                exerciseName: exercise.name,
                                duration: currentDuration,
                                repetitions: currentRep,
                                completedAt: new Date().toISOString(),
                                completed: false,
                                timeLeft: timeLeft,
                                difficulty: difficulty
                            };
                            const savedResults = await AsyncStorage.getItem('exerciseResults');
                            const results = savedResults ? JSON.parse(savedResults) : [];
                            results.push(result);
                            await AsyncStorage.setItem('exerciseResults', JSON.stringify(results));
                            router.replace('/');
                        } catch (error) {
                            console.error('Erreur lors de la sauvegarde:', error);
                            Alert.alert('Erreur', 'Impossible de sauvegarder l\'exercice');
                        }
                    }
                }
            ]
        );
    };

    if (!exercise) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.text.primary }]}>
                    Exercice non trouvé
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen
                options={{
                    title: exercise.name,
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        color: '#ffffff'
                    }
                }}
            />
            <View style={styles.content}>
                <Text style={[styles.description, { color: colors.text.secondary }]}>
                    {exercise.description}
                </Text>

                <View style={styles.difficultyContainer}>
                    <TouchableOpacity
                        style={[
                            styles.difficultyButton,
                            {
                                backgroundColor: difficulty === 'facile'
                                    ? isDark ? '#4a90e2' : colors.primary
                                    : isDark
                                        ? '#2a2a2a'
                                        : colors.card
                            }
                        ]}
                        onPress={() => handleDifficultyChange('facile')}
                    >
                        <Text style={[
                            styles.difficultyText,
                            {
                                color: difficulty === 'facile'
                                    ? '#ffffff'
                                    : isDark
                                        ? '#ffffff'
                                        : colors.text.primary
                            }
                        ]}>
                            Facile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.difficultyButton,
                            {
                                backgroundColor: difficulty === 'moyen'
                                    ? isDark ? '#4a90e2' : colors.primary
                                    : isDark
                                        ? '#2a2a2a'
                                        : colors.card
                            }
                        ]}
                        onPress={() => handleDifficultyChange('moyen')}
                    >
                        <Text style={[
                            styles.difficultyText,
                            {
                                color: difficulty === 'moyen'
                                    ? '#ffffff'
                                    : isDark
                                        ? '#ffffff'
                                        : colors.text.primary
                            }
                        ]}>
                            Moyen
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.difficultyButton,
                            {
                                backgroundColor: difficulty === 'difficile'
                                    ? isDark ? '#4a90e2' : colors.primary
                                    : isDark
                                        ? '#2a2a2a'
                                        : colors.card
                            }
                        ]}
                        onPress={() => handleDifficultyChange('difficile')}
                    >
                        <Text style={[
                            styles.difficultyText,
                            {
                                color: difficulty === 'difficile'
                                    ? '#ffffff'
                                    : isDark
                                        ? '#ffffff'
                                        : colors.text.primary
                            }
                        ]}>
                            Difficile
                        </Text>
                    </TouchableOpacity>
                </View>

                <TimerCircle timeLeft={timeLeft} totalTime={currentDuration}>
                    <Text style={[styles.timerText, { color: isDark ? '#ffffff' : colors.text.primary }]}>
                        {timeLeft}s
                    </Text>
                    <Text style={[styles.repText, { color: isDark ? '#ffffff' : colors.text.secondary }]}>
                        Répétition {currentRep}/{repetitions}
                    </Text>
                </TimerCircle>

                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDark ? '#ffffff' : colors.text.primary }]}>
                        Nombre de répétitions:
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.card,
                                color: isDark ? '#ffffff' : colors.text.primary,
                                borderColor: colors.text.secondary
                            }
                        ]}
                        value={repetitions}
                        onChangeText={setRepetitions}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: isRunning ? colors.secondary : colors.primary }
                        ]}
                        onPress={() => setIsRunning(!isRunning)}
                    >
                        <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                            {isRunning ? 'Arrêter' : 'Commencer'}
                        </Text>
                    </TouchableOpacity>
                    {!isRunning && (
                        <TouchableOpacity
                            style={[styles.abandonButton, { backgroundColor: theme.colors.error }]}
                            onPress={handleAbandon}
                        >
                            <Text style={styles.abandonButtonText}>Abandonner</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={[styles.instructionsContainer, { backgroundColor: isDark ? '#2a2a2a' : colors.card }]}>
                    <Text style={[styles.instructionsTitle, { color: isDark ? '#ffffff' : colors.text.primary }]}>
                        Instructions:
                    </Text>
                    <Text style={[styles.instructionsText, { color: isDark ? '#ffffff' : colors.text.secondary }]}>
                        {exercise.instructions}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
    content: {
        padding: 16,
    } as ViewStyle,
    description: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    } as TextStyle,
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    } as ViewStyle,
    difficultyButton: {
        padding: 8,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
    } as ViewStyle,
    difficultyText: {
        fontSize: 14,
        fontWeight: 'bold',
    } as TextStyle,
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
    } as TextStyle,
    repText: {
        fontSize: 16,
        marginTop: 8,
    } as TextStyle,
    inputContainer: {
        marginBottom: 24,
    } as ViewStyle,
    label: {
        fontSize: 16,
        marginBottom: 8,
    } as TextStyle,
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    } as TextStyle,
    buttonContainer: {
        marginBottom: 24,
        gap: 12,
    } as ViewStyle,
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    } as ViewStyle,
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    } as TextStyle,
    instructionsContainer: {
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    } as ViewStyle,
    instructionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    } as TextStyle,
    instructionsText: {
        fontSize: 14,
        lineHeight: 20,
    } as TextStyle,
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    } as TextStyle,
    abandonButton: {
        backgroundColor: theme.colors.error,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.lg,
    } as ViewStyle,
    abandonButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    } as TextStyle,
});
