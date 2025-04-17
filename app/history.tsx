import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView, ViewStyle, TextStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack } from 'expo-router';
import { theme } from './theme';
import { useTheme } from './context/ThemeContext';
import { ExerciseResult } from './types';
import { LinearGradient } from 'expo-linear-gradient';

// Données de test pour l'historique
const historyData: ExerciseResult[] = [
    {
        id: '1',
        exerciseId: '1',
        exerciseName: 'Pompes',
        duration: 120,
        repetitions: 30,
        completedAt: '2024-03-20T10:00:00Z',
        completed: true,
        timeLeft: 0,
    },
    {
        id: '2',
        exerciseId: '2',
        exerciseName: 'Squats',
        duration: 180,
        repetitions: 60,
        completedAt: '2024-03-19T15:30:00Z',
        completed: true,
        timeLeft: 0,
    },
];

export default function History() {
    const { colors, isDark } = useTheme();
    const [results, setResults] = useState<ExerciseResult[]>([]);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const savedResults = await AsyncStorage.getItem('exerciseResults');
            if (savedResults) {
                const parsedResults = JSON.parse(savedResults);
                // Trier les résultats par date (plus récent en premier)
                parsedResults.sort((a: ExerciseResult, b: ExerciseResult) =>
                    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
                );
                setResults(parsedResults);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des résultats:', error);
        }
    };

    const deleteResult = async (id: string) => {
        Alert.alert(
            'Confirmer la suppression',
            'Êtes-vous sûr de vouloir supprimer cet exercice de l\'historique ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const newResults = results.filter(result => result.id !== id);
                            await AsyncStorage.setItem('exerciseResults', JSON.stringify(newResults));
                            setResults(newResults);
                            Alert.alert('Succès', 'L\'exercice a été supprimé de l\'historique');
                        } catch (error) {
                            Alert.alert('Erreur', 'Impossible de supprimer l\'exercice');
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const groupResultsByDate = (results: ExerciseResult[]) => {
        const groups: { [key: string]: ExerciseResult[] } = {};
        results.forEach(result => {
            const date = new Date(result.completedAt);
            const dateKey = date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(result);
        });
        return groups;
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <Stack.Screen
                    options={{
                        title: 'Historique',
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
                    <Text style={[styles.title, { color: colors.text.primary }]}>Historique des Exercices</Text>
                    {results.length === 0 ? (
                        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucun exercice effectué</Text>
                    ) : (
                        Object.entries(groupResultsByDate(results)).map(([date, dateResults]) => (
                            <View key={date} style={styles.dateSection}>
                                <Text style={[styles.dateHeader, { color: colors.text.primary }]}>{date}</Text>
                                {dateResults.map((result) => (
                                    <View key={result.id} style={[styles.resultCard, { backgroundColor: colors.card }]}>
                                        <View style={styles.resultHeader}>
                                            <View style={styles.exerciseInfo}>
                                                <Text style={[styles.exerciseName, { color: colors.text.primary }]}>{result.exerciseName}</Text>
                                                <Text style={[styles.difficultyText, { color: colors.text.secondary }]}>
                                                    {result.difficulty === 'facile' ? 'Facile' : result.difficulty === 'moyen' ? 'Moyen' : 'Difficile'}
                                                </Text>
                                            </View>
                                            <View style={styles.headerRight}>
                                                <View style={[styles.durationBadge, result.completed ? styles.completedBadge : styles.failedBadge]}>
                                                    <Text style={styles.durationText}>
                                                        {result.completed ? `${result.duration}s` : `${result.duration - result.timeLeft}s`}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.deleteButton}
                                                    onPress={() => deleteResult(result.id)}
                                                >
                                                    <Text style={styles.deleteButtonText}>×</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={styles.resultDetails}>
                                            <Text style={[styles.time, { color: colors.text.secondary }]}>
                                                {new Date(result.completedAt).toLocaleTimeString('fr-FR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                            <Text style={[styles.status, result.completed ? styles.completedText : styles.failedText, { color: colors.text.primary }]}>
                                                {result.completed ? 'Exercice complété' : 'Exercice échoué'}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
    content: {
        padding: 16,
    } as ViewStyle,
    title: {
        ...theme.typography.h1,
        marginBottom: theme.spacing.lg,
    } as TextStyle,
    resultCard: {
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    } as ViewStyle,
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    } as ViewStyle,
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    } as ViewStyle,
    exerciseName: {
        ...theme.typography.body,
        fontWeight: 'bold',
    } as TextStyle,
    durationBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    } as ViewStyle,
    completedBadge: {
        backgroundColor: theme.colors.success,
    } as ViewStyle,
    failedBadge: {
        backgroundColor: theme.colors.error,
    } as ViewStyle,
    durationText: {
        ...theme.typography.body,
        fontWeight: 'bold',
    } as TextStyle,
    deleteButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.error,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    deleteButtonText: {
        color: theme.colors.card,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    } as TextStyle,
    resultDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,
    date: {
        ...theme.typography.caption,
    } as TextStyle,
    status: {
        ...theme.typography.caption,
        fontWeight: 'bold',
    } as TextStyle,
    completedText: {
        color: theme.colors.success,
    } as TextStyle,
    failedText: {
        color: theme.colors.error,
    } as TextStyle,
    emptyText: {
        ...theme.typography.body,
        textAlign: 'center',
    } as TextStyle,
    resultsContainer: {
        paddingBottom: theme.spacing.xl,
    } as ViewStyle,
    resultText: {
        ...theme.typography.body,
    } as TextStyle,
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    dateSection: {
        marginBottom: 24,
    } as ViewStyle,
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    } as TextStyle,
    time: {
        fontSize: 14,
    } as TextStyle,
    exerciseInfo: {
        flex: 1,
    } as ViewStyle,
    difficultyText: {
        fontSize: 12,
        marginTop: 2,
    } as TextStyle,
});
